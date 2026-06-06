import { AppShell } from "@/components/AppShell";
import { Badge, ButtonLink, Card, ProgressBar } from "@/components/ui";
import { getLevelByScore, tools } from "@/data/compass";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ score?: string }>;
}) {
  const params = await searchParams;
  const score = Math.max(0, Math.min(100, Number(params.score ?? 42) || 42));
  const level = getLevelByScore(score);
  const recommendedTools = tools.filter((tool) => tool.levels.includes(level.id));

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[#FFF3E0]">
            <Badge>진단 결과</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-normal">{level.name}</h1>
            <p className="mt-4 leading-7 text-[#5f6b85]">{level.summary}</p>
            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#5f6b85]">점수</span>
                <span className="font-semibold">{score} / 100</span>
              </div>
              <ProgressBar value={score} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/learning">학습 시작</ButtonLink>
              <ButtonLink href="/test" variant="secondary">
                다시 진단
              </ButtonLink>
            </div>
          </Card>

          <div className="grid gap-4">
            <Card>
              <h2 className="text-xl font-semibold">추천 학습 과정</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {level.courses.map((course) => (
                  <div key={course} className="rounded-xl bg-[#F8F9FC] p-4 text-sm text-[#1F2937]">
                    {course}
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold">추천 AI 도구</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {recommendedTools.map((tool) => (
                  <div key={tool.name} className="rounded-xl bg-[#F8F9FC] p-4">
                    <p className="text-sm text-[#FF8A65]">{tool.category}</p>
                    <p className="mt-1 font-semibold">{tool.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
