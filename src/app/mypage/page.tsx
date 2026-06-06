import { AppShell } from "@/components/AppShell";
import { Badge, Card, ProgressBar, Section } from "@/components/ui";

export default function MyPage() {
  return (
    <AppShell>
      <Section eyebrow="My Page" title="나의 AI 학습 현황">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="bg-[#FFF3E0]">
            <Badge>현재 레벨</Badge>
            <h2 className="mt-4 text-3xl font-bold">AI 초보자</h2>
            <p className="mt-3 text-sm leading-6 text-[#5f6b85]">
              Supabase Auth 연결 전까지는 데모 학습 현황을 보여줍니다.
            </p>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span>경험치</span>
                <span>42%</span>
              </div>
              <ProgressBar value={42} />
            </div>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["학습 진행", "3개 과정"],
              ["완료 강의", "1개"],
              ["즐겨찾기", "4개"],
            ].map(([label, value]) => (
              <Card key={label}>
                <p className="text-sm text-[#71809f]">{label}</p>
                <p className="mt-3 text-2xl font-bold">{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </AppShell>
  );
}
