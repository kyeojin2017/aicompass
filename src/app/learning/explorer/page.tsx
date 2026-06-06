"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, CheckCircle2, Clock, Sparkles, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge, Card, ProgressBar } from "@/components/ui";

const explorerLessons = [
  {
    page: "01",
    title: "AI는 무엇인가",
    time: "12분",
    goal: "AI가 사람처럼 생각하는 도구가 아니라, 입력을 바탕으로 결과를 예측하고 생성하는 도구라는 관점을 잡습니다.",
    content: [
      "AI는 데이터를 학습해 글, 이미지, 표, 아이디어 같은 결과를 만들어냅니다.",
      "처음에는 정답을 찾는 검색 엔진보다 초안과 방향을 함께 만드는 조력자로 생각하면 쉽습니다.",
      "좋은 결과를 얻으려면 내가 원하는 목적, 상황, 형식을 AI에게 알려줘야 합니다.",
    ],
    practice: "오늘 할 일 하나를 고르고, AI에게 도움받고 싶은 이유를 한 문장으로 적어보세요.",
  },
  {
    page: "02",
    title: "생성형 AI 이해하기",
    time: "15분",
    goal: "ChatGPT 같은 생성형 AI가 글과 아이디어를 어떻게 만들어내는지 초보자 언어로 이해합니다.",
    content: [
      "생성형 AI는 기존 자료를 그대로 복사하는 것이 아니라, 패턴을 바탕으로 새 결과를 조합합니다.",
      "그래서 결과는 유용할 수 있지만 항상 사실이라고 믿으면 안 됩니다.",
      "숫자, 법률, 최신 정보, 출처가 중요한 내용은 반드시 다시 확인해야 합니다.",
    ],
    practice: "AI에게 '생성형 AI를 중학생도 이해할 수 있게 설명해줘'라고 물어보고 답변을 읽어보세요.",
  },
  {
    page: "03",
    title: "첫 질문 작성하기",
    time: "18분",
    goal: "막연한 질문을 구체적인 요청으로 바꾸는 기본 구조를 익힙니다.",
    content: [
      "초보자에게 가장 쉬운 질문 구조는 '목표 + 상황 + 원하는 형식'입니다.",
      "예를 들어 '회의록 정리해줘'보다 '아래 회의 메모를 5줄 요약과 할 일 목록으로 정리해줘'가 좋습니다.",
      "AI가 애매하게 답하면 '더 쉽게', '표로', '예시 3개로'처럼 후속 요청을 이어가면 됩니다.",
    ],
    practice: "최근 메모 하나를 골라 '요약 + 할 일 + 다음 질문' 형식으로 정리해 달라고 요청해보세요.",
  },
  {
    page: "04",
    title: "AI 답변 검토하기",
    time: "14분",
    goal: "AI 답변을 그대로 쓰지 않고, 내 목적에 맞게 확인하고 고치는 습관을 만듭니다.",
    content: [
      "AI 답변은 초안입니다. 사실 여부, 표현 톤, 빠진 조건을 확인해야 합니다.",
      "모르는 분야의 답변일수록 출처 요청, 반례 요청, 체크리스트 요청이 도움이 됩니다.",
      "업무나 과제에 쓸 때는 개인정보와 민감한 내용을 입력하지 않는 습관도 중요합니다.",
    ],
    practice: "AI 답변을 받은 뒤 '이 답변에서 틀렸을 수 있는 부분 3가지를 알려줘'라고 다시 물어보세요.",
  },
  {
    page: "05",
    title: "나의 첫 AI 루틴 만들기",
    time: "20분",
    goal: "매일 10분씩 AI를 써보는 작은 루틴을 설계합니다.",
    content: [
      "처음부터 자동화나 고급 프롬프트를 목표로 삼지 않아도 됩니다.",
      "하루 10분 동안 요약, 아이디어 정리, 문장 다듬기 중 하나만 반복해도 감이 생깁니다.",
      "루틴은 '언제', '무엇을', '어떤 결과물로' 남길지 정하면 오래 갑니다.",
    ],
    practice: "이번 주에 반복할 AI 사용 루틴을 하나 정하고, 완료 기준을 한 줄로 적어보세요.",
  },
  {
    page: "06",
    title: "프롬프트 비결: 구체성",
    time: "15분",
    goal: "애매한 단어 대신 구체적인 지시어로 답변의 품질을 높이는 방법을 알아봅니다.",
    content: [
      "'친절하게', '대충', '자세히' 같은 모호한 단어보다는 지시의 범위나 대상을 명시합니다.",
      "'이메일 작성해줘' 대신 '배송이 하루 늦어진 점에 대해 정중히 사과하는 이메일을 고객용으로 작성해줘'와 같이 적습니다.",
      "조건이 세부적일수록 AI가 헤매지 않고 한 번에 정교한 결과물을 반환합니다.",
    ],
    practice: "모호하게 질문했던 프롬프트 하나를 골라 상황, 대상, 조건을 추가해 다시 질문해 보세요.",
  },
  {
    page: "07",
    title: "꼬리 질문으로 답 찾기",
    time: "13분",
    goal: "대화를 주고받으며 원하는 정답에 점진적으로 다가가는 이어가기 방법을 이해합니다.",
    content: [
      "AI와의 대화는 한 번으로 끝나지 않습니다. 답변을 바탕으로 꼬리 질문을 던지는 것이 핵심입니다.",
      "원하는 내용이 빠졌다면 '여기에 구체적인 수치 예시를 추가해줘'라고 덧붙여 보세요.",
      "이해되지 않는 단어는 '그 용어를 쉽게 풀어서 다시 설명해줘'라며 좁혀나갈 수 있습니다.",
    ],
    practice: "AI 답변에서 아쉬운 부분이나 더 알고 싶은 키워드를 골라 2차 질문을 연달아 던져보세요.",
  },
  {
    page: "08",
    title: "AI에게 역할(페르소나) 주기",
    time: "16분",
    goal: "AI에 직업이나 입장을 부여하여 상황에 완벽히 몰입한 고도화된 대답을 유도합니다.",
    content: [
      "답변의 어조나 전문성을 바꾸고 싶다면 '너는 10년 차 카피라이터야'처럼 역할을 부여해 보세요.",
      "특정 관점의 피드백을 원할 때는 '비판적인 투자자 관점에서 이 계획서의 약점 3가지를 짚어줘'라고 요청합니다.",
      "역할을 부여하면 해당 직군이 자주 사용하는 단어와 양식으로 답이 출력됩니다.",
    ],
    practice: "작성 중인 기획서를 올리고, '노련한 마케터 관점에서 보완점 피드백해줘'라고 요청해 보세요.",
  },
  {
    page: "09",
    title: "AI 함정(환각 현상) 피하기",
    time: "17분",
    goal: "AI가 그럴듯하게 거짓말을 지어내는 환각(Hallucination) 현상을 이해하고 대처합니다.",
    content: [
      "AI는 진실만을 말하는 백과사전이 아니라 언어 확률 모델이므로, 존재하지 않는 사실을 지어낼 수 있습니다.",
      "출처나 팩트 체크가 중요한 경우, 검색을 활용하게 하거나 원래 사실 여부를 별도로 검증해야 합니다.",
      "'모르면 모른다고 답해줘'라는 문장을 프롬프트 끝에 덧붙이면 환각을 줄일 수 있습니다.",
    ],
    practice: "가상 인물이나 역사적 거짓 사실을 물어보고 AI가 지어내는지 관찰한 뒤 검증을 시도해 보세요.",
  },
  {
    page: "10",
    title: "첫 번째 AI 협업 글쓰기",
    time: "20분",
    goal: "AI를 조력자로 삼아 한 편의 블로그 글이나 비즈니스 편지 초안을 최종 완성해봅니다.",
    content: [
      "내가 생각한 뼈대(개요)를 작성한 뒤, AI에게 각 문단을 살찌워 달라고 부탁합니다.",
      "초안이 나오면 가독성을 높이기 위해 '가독성이 좋게 단락을 나누고 중요 키워드를 볼드로 강조해줘'라고 요청합니다.",
      "최종 검토 과정에서 문맥의 어색한 부분이나 오타는 직접 수정하며 협업을 마칩니다.",
    ],
    practice: "전하고 싶은 고마운 마음이나 관심 있는 주제로 AI와 협업하여 500자 내외의 글을 지어보세요.",
  },
];

const defaultProgress: Record<string, number> = {
  "01": 40,
  "02": 0,
  "03": 0,
  "04": 0,
  "05": 0,
  "06": 0,
  "07": 0,
  "08": 0,
  "09": 0,
  "10": 0,
};

export default function ExplorerLearningPage() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>(defaultProgress);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("explorer_progress");
    if (saved) {
      try {
        setProgressMap(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem("explorer_progress", JSON.stringify(defaultProgress));
    }
    setMounted(true);
  }, []);

  const toggleComplete = (page: string) => {
    const currentProgress = progressMap[page] || 0;
    const newProgress = currentProgress === 100 ? 0 : 100;
    const newMap = { ...progressMap, [page]: newProgress };
    setProgressMap(newMap);
    localStorage.setItem("explorer_progress", JSON.stringify(newMap));
  };

  const handleReset = () => {
    if (confirm("모든 학습 진도를 초기화하시겠습니까?")) {
      setProgressMap(defaultProgress);
      localStorage.setItem("explorer_progress", JSON.stringify(defaultProgress));
    }
  };

  const lessonsWithProgress = explorerLessons.map((lesson) => ({
    ...lesson,
    progress: progressMap[lesson.page] ?? 0,
  }));

  const completed = lessonsWithProgress.filter((lesson) => lesson.progress === 100).length;
  const totalProgress = Math.round(
    lessonsWithProgress.reduce((sum, lesson) => sum + lesson.progress, 0) / lessonsWithProgress.length,
  );

  return (
    <AppShell>
      <section className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/learning" className="inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#1F2937]">
          <ArrowLeft size={16} />
          학습 로드맵으로 돌아가기
        </Link>

        <Card className="bg-[#FFF3E0]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge>Level 0 · 0-25점</Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-normal sm:text-4xl">AI 탐험가 과정</h1>
              <p className="mt-3 leading-7 text-[#6B7280]">
                AI 사용 경험이 거의 없는 사용자를 위한 첫 단계입니다. 개념 이해, 첫 질문 작성,
                답변 검토, 작은 학습 루틴 만들기부터 프롬프트 구체성, 페르소나 및 글쓰기 실습까지 총 10페이지로 정리했습니다.
              </p>
            </div>
            <div className="w-full rounded-2xl bg-white p-4 lg:w-72">
              <div className="mb-2 flex justify-between text-sm">
                <span>전체 진행률</span>
                <span className="font-semibold">{mounted ? totalProgress : 4}%</span>
              </div>
              <ProgressBar value={mounted ? totalProgress : 4} />
              <div className="mt-3 flex items-center justify-between text-sm text-[#6B7280]">
                <span>
                  완료 {mounted ? completed : 0} / {explorerLessons.length} 페이지
                </span>
                {mounted && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs text-[#FF8A65] hover:text-[#F9734E] font-semibold transition cursor-pointer"
                  >
                    <RefreshCw size={12} />
                    진도 초기화
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
          <Card>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#FFF3E0] text-[#FF8A65]">
                <Sparkles size={20} />
              </span>
              <div>
                <h2 className="text-xl font-bold">이 단계의 목표</h2>
                <p className="text-sm text-[#6B7280]">부담 없이 AI와 첫 대화를 시작하고 친숙해집니다.</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-[#6B7280]">
              <p>AI가 무엇을 잘하고 못하는지 구분합니다.</p>
              <p>좋은 질문의 기본 구조(상황, 목적, 형식)를 배웁니다.</p>
              <p>AI 답변을 검토하고 구체화된 역할과 꼬리 질문을 사용합니다.</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#E8F5E9] text-[#2E7D32]">
                <BookOpenCheck size={20} />
              </span>
              <div>
                <h2 className="text-xl font-bold">추천 완료 기준</h2>
                <p className="text-sm text-[#6B7280]">각 페이지를 읽고 실습 문장을 직접 실행해 보면 충분합니다.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {["질문 및 꼬리 질문 작성", "역할 설정 및 피드백", "AI 루틴 및 협업 글쓰기"].map((item) => (
                <div key={item} className="rounded-2xl bg-[#F8F9FC] p-4 text-sm font-semibold text-[#1F2937] flex items-center justify-center text-center">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4">
          {lessonsWithProgress.map((lesson) => {
            const isCompleted = lesson.progress === 100;
            return (
              <Card key={lesson.page}>
                <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
                  <div>
                    <Badge>Page {lesson.page}</Badge>
                    <div className="mt-4 flex items-center gap-2 text-sm text-[#6B7280]">
                      <Clock size={16} />
                      {lesson.time}
                    </div>
                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-sm">
                        <span>진행률</span>
                        <span className="font-semibold">{lesson.progress}%</span>
                      </div>
                      <ProgressBar value={lesson.progress} />
                      <button
                        type="button"
                        onClick={() => toggleComplete(lesson.page)}
                        className={`mt-4 w-full cursor-pointer rounded-xl py-2 px-3 text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                          isCompleted
                            ? "bg-[#E8F5E9] border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#C8E6C9] hover:border-[#2E7D32]/30"
                            : "bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-[#FFF3E0] hover:border-[#FF8A65] hover:text-[#1F2937]"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 size={14} className="text-[#2E7D32]" />
                            완료됨
                          </>
                        ) : (
                          "완료하기"
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">{lesson.title}</h2>
                    <p className="mt-3 rounded-2xl bg-[#FFF3E0] p-4 text-sm leading-6 text-[#8A4B1F]">
                      {lesson.goal}
                    </p>
                    <div className="mt-5 space-y-3">
                      {lesson.content.map((item) => (
                        <div key={item} className="flex gap-3 text-sm leading-6 text-[#4B5563]">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-[#4CAF50]" size={18} />
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-2xl border border-[#E5E7EB] bg-[#F8F9FC] p-4">
                      <p className="text-sm font-semibold">실습</p>
                      <p className="mt-2 text-sm leading-6 text-[#6B7280]">{lesson.practice}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
