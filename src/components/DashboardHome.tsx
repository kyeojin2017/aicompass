import { Award, BookOpenCheck, Brain, Clock, Sparkles, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge, ButtonLink, Card, ProgressBar } from "@/components/ui";
import { CompetencyRadarChart, LearningLineChart } from "@/components/DashboardCharts";
import { levels, tools } from "@/data/compass";

const stats = [
  { label: "현재 레벨", value: "AI 실용자", helper: "Level 2", icon: Brain, color: "bg-[#FFF3E0] text-[#B45309]" },
  { label: "학습 진도율", value: "68%", helper: "이번 주 +12%", icon: TrendingUp, color: "bg-[#E8F5E9] text-[#2E7D32]" },
  { label: "완료 강의", value: "18개", helper: "목표까지 5개", icon: BookOpenCheck, color: "bg-[#E3F2FD] text-[#1565C0]" },
  { label: "다음 레벨 달성", value: "87%", helper: "AI 전문가", icon: Award, color: "bg-[#FCE4EC] text-[#AD1457]" },
];

const recommendedLessons = [
  { title: "업무 문서 자동화", tag: "AI 실용자", minutes: "35분", progress: 72 },
  { title: "PPT 초안 만들기", tag: "문서 작성", minutes: "28분", progress: 40 },
  { title: "이미지 생성 입문", tag: "창작 도구", minutes: "22분", progress: 18 },
];

export function DashboardHome() {
  return (
    <AppShell>
      <section className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#FF8A65]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal sm:text-4xl">AI 학습 현황</h1>
            <p className="mt-2 text-[#6B7280]">현재 레벨, 학습 진도, 추천 과정을 한눈에 확인하세요.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/test">레벨 테스트</ButtonLink>
            <ButtonLink href="/learning" variant="secondary">
              로드맵 보기
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#6B7280]">{stat.label}</p>
                    <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-sm text-[#6B7280]">{stat.helper}</p>
                  </div>
                  <span className={`grid size-11 place-items-center rounded-2xl ${stat.color}`}>
                    <Icon size={20} />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">AI 성장 그래프</h2>
                <p className="mt-1 text-sm text-[#6B7280]">주간 학습시간 추이</p>
              </div>
              <Badge>Line Chart</Badge>
            </div>
            <LearningLineChart />
          </Card>
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">AI 역량 분석</h2>
                <p className="mt-1 text-sm text-[#6B7280]">강점과 보완 영역</p>
              </div>
              <Badge>Radar</Badge>
            </div>
            <CompetencyRadarChart />
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
          <Card className="bg-[#FFF3E0]">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-[#FF8A65]">
                <Clock size={20} />
              </span>
              <div>
                <h2 className="text-xl font-bold">레벨 현황</h2>
                <p className="text-sm text-[#6B7280]">AI 실용자에서 전문가로 이동 중</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>현재 점수</span>
                <span className="font-semibold">68점</span>
              </div>
              <ProgressBar value={68} />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-[#6B7280]">다음 목표</p>
                  <p className="mt-1 font-semibold">AI 전문가</p>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-[#6B7280]">예상 기간</p>
                  <p className="mt-1 font-semibold">2주</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">추천 학습</h2>
                <p className="mt-1 text-sm text-[#6B7280]">오늘 이어서 하기 좋은 과정</p>
              </div>
              <Badge>Learning</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {recommendedLessons.map((lesson) => (
                <div key={lesson.title} className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FC] p-4">
                  <Badge>{lesson.tag}</Badge>
                  <h3 className="mt-4 font-semibold">{lesson.title}</h3>
                  <p className="mt-2 text-sm text-[#6B7280]">예상 학습시간 {lesson.minutes}</p>
                  <div className="mt-4">
                    <ProgressBar value={lesson.progress} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">추천 AI 도구</h2>
              <p className="mt-1 text-sm text-[#6B7280]">현재 레벨에 맞는 도구를 먼저 실험해 보세요.</p>
            </div>
            <Sparkles className="text-[#FF8A65]" size={22} />
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {tools.slice(0, 4).map((tool) => (
              <div key={tool.name} className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                <Badge>{tool.category}</Badge>
                <h3 className="mt-4 font-semibold">{tool.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#6B7280]">{tool.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-4">
          {levels.map((level) => (
            <Card key={level.id}>
              <Badge>{level.range}점</Badge>
              <h3 className="mt-4 font-semibold">{level.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">{level.courses[0]}</p>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
