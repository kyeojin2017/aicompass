"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Badge, Card, ProgressBar, Section } from "@/components/ui";
import { learningCategories, levels } from "@/data/compass";

const defaultProgress: Record<string, number> = {
  "01": 40,
  "02": 0,
  "03": 0,
};

export default function LearningPage() {
  const [explorerProgress, setExplorerProgress] = useState<Record<string, number>>(defaultProgress);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("explorer_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExplorerProgress({
          "01": parsed["01"] !== undefined ? parsed["01"] : defaultProgress["01"],
          "02": parsed["02"] !== undefined ? parsed["02"] : defaultProgress["02"],
          "03": parsed["03"] !== undefined ? parsed["03"] : defaultProgress["03"],
        });
      } catch (e) {
        console.error(e);
      }
    }
    setMounted(true);
  }, []);

  return (
    <AppShell>
      <Section eyebrow="Learning Center" title="레벨별 학습 콘텐츠">
        <div className="mb-8 flex flex-wrap gap-2">
          {learningCategories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {levels.map((level, index) => (
            <Link
              key={level.id}
              href={level.id === "explorer" ? "/learning/explorer" : `/learning?level=${level.id}`}
              className="group block rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A65]"
            >
              <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:border-[#FF8A65] group-hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#FF8A65]">Level {index}</p>
                    <h2 className="mt-2 text-xl font-semibold">{level.name}</h2>
                  </div>
                  <Badge>{level.range}점</Badge>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#5f6b85]">{level.summary}</p>
                <div className="mt-5 space-y-3">
                  {level.courses.map((course, courseIndex) => {
                    let progress = 0;
                    if (level.id === "explorer") {
                      if (courseIndex === 0) progress = explorerProgress["01"];
                      else if (courseIndex === 1) progress = explorerProgress["02"];
                      else if (courseIndex === 2) progress = explorerProgress["03"];
                    }

                    const displayProgress = mounted
                      ? progress
                      : level.id === "explorer" && courseIndex === 0
                      ? 40
                      : 0;

                    return (
                      <div key={course}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span>{course}</span>
                          <span className="text-[#71809f]">{displayProgress}%</span>
                        </div>
                        <ProgressBar value={displayProgress} />
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-sm font-semibold text-[#FF8A65]">
                  {level.id === "explorer" ? "AI 탐험가 과정 열기" : "과정 준비 중"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
