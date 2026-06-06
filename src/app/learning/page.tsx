import { AppShell } from "@/components/AppShell";
import { Badge, Card, ProgressBar, Section } from "@/components/ui";
import { learningCategories, levels } from "@/data/compass";

export default function LearningPage() {
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
            <Card key={level.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#FF8A65]">Level {index}</p>
                  <h2 className="mt-2 text-xl font-semibold">{level.name}</h2>
                </div>
                <Badge>{level.range}점</Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#5f6b85]">{level.summary}</p>
              <div className="mt-5 space-y-3">
                {level.courses.map((course, courseIndex) => (
                  <div key={course}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{course}</span>
                      <span className="text-[#71809f]">{courseIndex === 0 ? 40 : 0}%</span>
                    </div>
                    <ProgressBar value={courseIndex === 0 ? 40 : 0} />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
