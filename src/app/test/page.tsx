"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Card, ProgressBar } from "@/components/ui";
import { questions } from "@/data/compass";

export default function TestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const score = useMemo(() => Object.values(answers).reduce((sum, value) => sum + value, 0), [answers]);
  const complete = Object.keys(answers).length === questions.length;

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold text-[#FF8A65]">AI Level Test</p>
        <h1 className="mt-3 text-4xl font-bold tracking-normal">나의 AI 출발점을 확인하세요</h1>
        <p className="mt-4 text-[#5f6b85]">각 문항에서 가장 가까운 답을 고르면 결과 페이지에서 학습 로드맵을 보여드립니다.</p>

        <div className="mt-8 space-y-5">
          {questions.map((item, index) => (
            <Card key={item.id}>
              <p className="text-sm text-[#71809f]">Question {index + 1}</p>
              <h2 className="mt-2 text-xl font-semibold">{item.question}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {item.options.map((option) => {
                  const selected = answers[item.id] === option.value;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [item.id]: option.value }))}
                      className={`min-h-12 rounded-lg border px-4 py-3 text-left text-sm transition ${
                        selected
                          ? "border-[#FF8A65] bg-[#FFF3E0] text-[#1F2937]"
                          : "border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-[#FFF3E0]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <div className="sticky bottom-4 mt-8 rounded-[20px] border border-[#E5E7EB] bg-white/95 p-4 shadow-2xl shadow-slate-200/80 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#5f6b85]">현재 점수</span>
                <span className="font-semibold">{score} / 100</span>
              </div>
              <ProgressBar value={score} />
            </div>
            <button
              type="button"
              disabled={!complete}
              onClick={() => router.push(`/result?score=${score}`)}
              className="h-11 rounded-xl bg-[#FF8A65] px-5 text-sm font-semibold text-white transition hover:bg-[#F9734E] disabled:cursor-not-allowed disabled:bg-[#E5E7EB] disabled:text-[#6B7280]"
            >
              결과 보기
            </button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
