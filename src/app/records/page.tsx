import { AppShell } from "@/components/AppShell";
import { Badge, Card, ProgressBar, Section } from "@/components/ui";

const records = [
  { title: "프롬프트 기초", date: "오늘", progress: 80, time: "20분" },
  { title: "문서 요약 실습", date: "어제", progress: 100, time: "35분" },
  { title: "PPT 초안 만들기", date: "이번 주", progress: 45, time: "18분" },
];

export default function RecordsPage() {
  return (
    <AppShell>
      <Section eyebrow="Records" title="학습 기록">
        <div className="grid gap-4">
          {records.map((record) => (
            <Card key={record.title}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge>{record.date}</Badge>
                  <h2 className="mt-3 text-xl font-semibold">{record.title}</h2>
                  <p className="mt-1 text-sm text-[#6B7280]">학습 시간 {record.time}</p>
                </div>
                <div className="w-full sm:w-64">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>진행률</span>
                    <span className="font-semibold">{record.progress}%</span>
                  </div>
                  <ProgressBar value={record.progress} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
