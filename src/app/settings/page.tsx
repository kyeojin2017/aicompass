import { AppShell } from "@/components/AppShell";
import { Card, Section } from "@/components/ui";

const settings = [
  { label: "주간 학습 리마인더", value: "켜짐" },
  { label: "추천 난이도", value: "현재 레벨 기준" },
  { label: "관심 카테고리", value: "문서 작성, 프롬프트, AI 도구" },
];

export default function SettingsPage() {
  return (
    <AppShell>
      <Section eyebrow="Settings" title="설정">
        <div className="grid gap-4 lg:grid-cols-2">
          {settings.map((item) => (
            <Card key={item.label}>
              <p className="text-sm text-[#6B7280]">{item.label}</p>
              <p className="mt-3 text-xl font-semibold">{item.value}</p>
            </Card>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
