import { Award, BookOpenCheck, Flame, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge, Card, Section } from "@/components/ui";

const badges = [
  { title: "첫 진단 완료", description: "AI 레벨 테스트를 완료했어요.", icon: Award },
  { title: "3일 연속 학습", description: "꾸준한 학습 루틴을 만들고 있어요.", icon: Flame },
  { title: "프롬프트 입문", description: "질문 작성 기초 과정을 시작했어요.", icon: Sparkles },
  { title: "문서 작성 실습", description: "AI로 문서 초안을 만들어 봤어요.", icon: BookOpenCheck },
];

export default function BadgesPage() {
  return (
    <AppShell>
      <Section eyebrow="Badges" title="획득 배지">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {badges.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <span className="grid size-12 place-items-center rounded-2xl bg-[#FFF3E0] text-[#FF8A65]">
                  <Icon size={22} />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">{item.description}</p>
                <div className="mt-4">
                  <Badge>획득 완료</Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </AppShell>
  );
}
