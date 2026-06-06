"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge, Card, ProgressBar, Section } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";

const GoogleIcon = () => (
  <svg className="mr-2 h-5 w-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [progressPercent, setProgressPercent] = useState(42); // default demo progress
  const [completedCount, setCompletedCount] = useState(1); // default demo completed

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

    // 3. Load actual explorer progress from localStorage if available
    const saved = localStorage.getItem("explorer_progress");
    if (saved) {
      try {
        const progressMap = JSON.parse(saved);
        const values = Object.values(progressMap) as number[];
        const total = values.reduce((sum, val) => sum + val, 0);
        const avg = Math.round(total / 10); // 10 lessons in total
        const completed = values.filter((val) => val === 100).length;
        
        setProgressPercent(avg);
        setCompletedCount(completed);
      } catch (e) {
        console.error("Error loading progress in mypage:", e);
      }
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
    <AppShell>
      <Section eyebrow="My Page" title="나의 AI 학습 현황">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {loading ? (
            <Card className="animate-pulse bg-[#F3F4F6] h-60"><div /></Card>
          ) : user ? (
            <Card className="bg-[#FFF3E0] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      className="size-12 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="grid size-12 place-items-center rounded-xl bg-[#FFE0B2] text-lg font-semibold text-[#8A4B1F]">
                      {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
                    </span>
                  )}
                  <div>
                    <h2 className="text-xl font-bold">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}님
                    </h2>
                    <p className="text-xs text-[#6B7280]">{user.email}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge>인증된 회원</Badge>
                  <Badge>AI 탐험가</Badge>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>학습 진행도 (경험치)</span>
                    <span className="font-semibold">{progressPercent}%</span>
                  </div>
                  <ProgressBar value={progressPercent} />
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-6 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#6B7280] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition cursor-pointer"
              >
                <LogOut size={16} />
                로그아웃
              </button>
            </Card>
          ) : (
            <Card className="bg-[#FFF3E0] flex flex-col justify-between">
              <div>
                <Badge>게스트</Badge>
                <h2 className="mt-4 text-3xl font-bold">AI 초보자 (데모)</h2>
                <p className="mt-3 text-sm leading-6 text-[#5f6b85]">
                  구글 로그인을 하시면 회원 전용 학습 현황 관리 기능이 활성화됩니다.
                </p>
                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>경험치</span>
                    <span>42%</span>
                  </div>
                  <ProgressBar value={42} />
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#1F2937] hover:bg-gray-50 shadow-sm transition cursor-pointer"
              >
                <GoogleIcon />
                구글 계정으로 로그인
              </button>
            </Card>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["학습 진행", `${completedCount > 0 ? completedCount : 3}개 과정`],
              ["완료 강의", `${completedCount}개`],
              ["즐겨찾기", "4개"],
            ].map(([label, value]) => (
              <Card key={label} className="flex flex-col justify-center min-h-32">
                <p className="text-sm text-[#71809f]">{label}</p>
                <p className="mt-3 text-3xl font-bold">{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </AppShell>
  );
}
