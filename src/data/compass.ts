export type LevelId = "explorer" | "beginner" | "practical" | "expert";

export type CompassLevel = {
  id: LevelId;
  name: string;
  range: string;
  scoreMin: number;
  scoreMax: number;
  summary: string;
  courses: string[];
  tools: string[];
};

export type AiTool = {
  name: string;
  category: string;
  description: string;
  levels: LevelId[];
  url: string;
};

export const levels: CompassLevel[] = [
  {
    id: "explorer",
    name: "AI 탐험가",
    range: "0-25",
    scoreMin: 0,
    scoreMax: 25,
    summary: "AI 사용 경험이 거의 없어 기본 개념부터 차근차근 시작하면 좋아요.",
    courses: ["AI는 무엇인가", "생성형 AI 이해하기", "첫 질문 작성하기"],
    tools: ["ChatGPT", "Adobe Firefly"],
  },
  {
    id: "beginner",
    name: "AI 초보자",
    range: "26-50",
    scoreMin: 26,
    scoreMax: 50,
    summary: "ChatGPT를 써본 적이 있고, 질문 품질과 반복 연습이 성장 포인트예요.",
    courses: ["질문 잘하는 법", "프롬프트 기초", "업무 메모 요약하기"],
    tools: ["ChatGPT", "Gemini", "Adobe Firefly"],
  },
  {
    id: "practical",
    name: "AI 실용자",
    range: "51-75",
    scoreMin: 51,
    scoreMax: 75,
    summary: "AI를 업무와 학습에 활용하고 있어 문서, 발표, 콘텐츠 제작으로 확장할 단계예요.",
    courses: ["문서 작성 자동화", "PPT 초안 만들기", "블로그 글 작성"],
    tools: ["Claude", "Gemini", "Midjourney", "Runway"],
  },
  {
    id: "expert",
    name: "AI 전문가",
    range: "76-100",
    scoreMin: 76,
    scoreMax: 100,
    summary: "반복 업무 자동화와 워크플로 설계로 생산성을 크게 높일 수 있어요.",
    courses: ["워크플로 설계", "자동화 기초", "팀 AI 활용 가이드 만들기"],
    tools: ["Claude", "Midjourney", "Runway"],
  },
];

export const questions = [
  {
    id: "experience",
    question: "AI 도구를 얼마나 자주 사용하나요?",
    options: [
      { label: "거의 사용하지 않음", value: 5 },
      { label: "가끔 질문해 봄", value: 15 },
      { label: "주 2-3회 사용", value: 22 },
      { label: "매일 업무나 학습에 사용", value: 25 },
    ],
  },
  {
    id: "prompt",
    question: "원하는 답을 얻기 위해 질문을 구체화할 수 있나요?",
    options: [
      { label: "아직 어렵다", value: 5 },
      { label: "예시를 보고 따라 한다", value: 13 },
      { label: "목표와 조건을 적는다", value: 20 },
      { label: "역할, 형식, 평가 기준까지 설계한다", value: 25 },
    ],
  },
  {
    id: "workflow",
    question: "AI를 실제 작업 흐름에 연결해 본 경험은 어느 정도인가요?",
    options: [
      { label: "단발성 질문 중심", value: 5 },
      { label: "요약이나 번역에 활용", value: 12 },
      { label: "문서와 발표 자료 초안 제작", value: 20 },
      { label: "반복 업무 자동화까지 시도", value: 25 },
    ],
  },
  {
    id: "tools",
    question: "여러 AI 도구를 목적에 맞게 골라 쓸 수 있나요?",
    options: [
      { label: "도구 차이를 잘 모름", value: 5 },
      { label: "대표 챗봇 정도만 안다", value: 12 },
      { label: "이미지, 문서, 검색 도구를 구분한다", value: 20 },
      { label: "작업별 도구 조합을 설계한다", value: 25 },
    ],
  },
];

export const tools: AiTool[] = [
  {
    name: "ChatGPT",
    category: "챗봇",
    description: "대화형 AI 서비스. 질문, 요약, 글쓰기, 아이디어 정리에 폭넓게 활용합니다.",
    levels: ["beginner", "practical", "expert"],
    url: "https://chatgpt.com",
  },
  {
    name: "Claude",
    category: "문서 작성",
    description: "긴 문서 분석과 글 다듬기에 강한 AI 도구입니다.",
    levels: ["practical", "expert"],
    url: "https://claude.ai",
  },
  {
    name: "Gemini",
    category: "챗봇",
    description: "Google 생태계와 함께 쓰기 좋은 멀티모달 AI 서비스입니다.",
    levels: ["beginner", "practical"],
    url: "https://gemini.google.com",
  },
  {
    name: "Midjourney",
    category: "이미지 생성",
    description: "고품질 콘셉트 이미지와 비주얼 시안을 만들 때 적합합니다.",
    levels: ["practical", "expert"],
    url: "https://www.midjourney.com",
  },
  {
    name: "Adobe Firefly",
    category: "이미지 생성",
    description: "상업적 디자인 워크플로에 연결하기 쉬운 Adobe 생성형 AI입니다.",
    levels: ["explorer", "beginner", "practical"],
    url: "https://firefly.adobe.com",
  },
  {
    name: "Runway",
    category: "영상 생성",
    description: "AI 영상 생성과 편집을 빠르게 실험할 수 있는 크리에이티브 도구입니다.",
    levels: ["practical", "expert"],
    url: "https://runwayml.com",
  },
];

export const learningCategories = [
  "AI 기초",
  "ChatGPT",
  "프롬프트",
  "이미지 생성",
  "영상 생성",
];

export function getLevelByScore(score: number) {
  return levels.find((level) => score >= level.scoreMin && score <= level.scoreMax) ?? levels[0];
}
