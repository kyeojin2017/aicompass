import { AppShell } from "@/components/AppShell";
import { Badge, Card, Section } from "@/components/ui";
import { tools } from "@/data/compass";

const categories = Array.from(new Set(tools.map((tool) => tool.category)));

export default function ToolsPage() {
  return (
    <AppShell>
      <Section eyebrow="AI Tools" title="카테고리별 추천 AI 도구">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.name}>
              <Badge>{tool.category}</Badge>
              <h2 className="mt-4 text-xl font-semibold">{tool.name}</h2>
              <p className="mt-3 min-h-18 text-sm leading-6 text-[#5f6b85]">{tool.description}</p>
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm font-semibold text-[#1F2937] transition hover:bg-[#FFF3E0]"
              >
                바로가기
              </a>
            </Card>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
