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
  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1F2937]">
      <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
        <nav className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              aria-label="메뉴 열기"
              className="grid size-10 place-items-center rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] lg:hidden"
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
              className="grid size-10 place-items-center rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280]"
              type="button"
            >
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white py-1 pl-1 pr-3">
              <span className="grid size-8 place-items-center rounded-lg bg-[#FFE0B2] text-sm font-semibold text-[#8A4B1F]">
                B
              </span>
              <div className="hidden text-sm sm:block">
                <p className="font-semibold">빛이나</p>
                <p className="text-xs text-[#6B7280]">AI 실용자</p>
              </div>
            </div>
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
