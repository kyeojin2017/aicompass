"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  Bell,
  BookOpen,
  Brain,
  Home,
  Menu,
  Search,
  Settings,
  Sparkles,
  Trophy,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/", label: "대시보드", icon: Home },
  { href: "/test", label: "AI 레벨", icon: Brain },
  { href: "/learning", label: "학습 로드맵", icon: BookOpen },
  { href: "/tools", label: "AI 도구 추천", icon: Sparkles },
  { href: "/records", label: "학습 기록", icon: Trophy },
  { href: "/badges", label: "배지", icon: Award },
  { href: "/settings", label: "설정", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!showDropdown) return;
    const handleOutsideClick = () => setShowDropdown(false);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showDropdown]);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin + "/mypage" : "",
        },
      });
      if (error) throw error;
    } catch (e) {
      console.error("Login error:", e);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (e) {
      console.error("Logout error:", e);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1F2937]">
      <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
        <nav className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              aria-label="메뉴 열기"
              className="grid size-10 place-items-center rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] lg:hidden cursor-pointer"
              type="button"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid size-9 place-items-center rounded-xl bg-[#FF8A65] text-sm text-white shadow-sm shadow-orange-200">
                AI
              </span>
              <span>AI Compass</span>
            </Link>
          </div>

          <div className="hidden h-11 w-full max-w-md items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F8F9FC] px-3 text-sm text-[#6B7280] md:flex">
            <Search size={18} />
            <span>학습 과정, AI 도구 검색</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="알림"
              className="grid size-10 place-items-center rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] cursor-pointer"
              type="button"
            >
              <Bell size={18} />
            </button>

            {loading ? (
              <div className="h-10 w-28 animate-pulse rounded-xl bg-[#F3F4F6]" />
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                  className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white py-1 pl-1 pr-3 hover:bg-[#F8F9FC] transition cursor-pointer text-left"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      className="size-8 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="grid size-8 place-items-center rounded-lg bg-[#FFE0B2] text-sm font-semibold text-[#8A4B1F]">
                      {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                    </span>
                  )}
                  <div className="hidden text-sm sm:block">
                    <p className="font-semibold truncate max-w-[80px]">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </p>
                    <p className="text-xs text-[#6B7280]">로그인됨</p>
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-xl shadow-slate-200/80 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/mypage"
                      onClick={() => setShowDropdown(false)}
                      className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-[#1F2937] hover:bg-[#FFF3E0] transition"
                    >
                      마이페이지
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDropdown(false);
                        handleLogout();
                      }}
                      className="block w-full rounded-xl px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF8A65] px-4 text-sm font-semibold text-white shadow-sm shadow-orange-200 hover:bg-[#F9734E] transition cursor-pointer"
              >
                구글 로그인
              </button>
            )}
          </div>
        </nav>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-[#E5E7EB] bg-white p-4 lg:block">
          <div className="mb-5 rounded-2xl bg-[#FFF3E0] p-4">
            <p className="text-xs font-semibold text-[#FF8A65]">Today Focus</p>
            <p className="mt-2 text-sm font-semibold">프롬프트 기초 20분</p>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#6B7280] transition hover:bg-[#FFF3E0] hover:text-[#1F2937]"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
