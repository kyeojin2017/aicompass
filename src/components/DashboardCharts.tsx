"use client";

import {
  Area,
  AreaChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const weeklyLearning = [
  { day: "월", hours: 1.2, lessons: 2, xp: 18 },
  { day: "화", hours: 1.8, lessons: 3, xp: 28 },
  { day: "수", hours: 1.1, lessons: 1, xp: 16 },
  { day: "목", hours: 2.4, lessons: 4, xp: 36 },
  { day: "금", hours: 1.7, lessons: 3, xp: 26 },
  { day: "토", hours: 2.9, lessons: 5, xp: 44 },
  { day: "일", hours: 2.1, lessons: 3, xp: 32 },
];

const competency = [
  { subject: "AI 이해도", score: 72 },
  { subject: "프롬프트", score: 68 },
  { subject: "문서작성", score: 81 },
  { subject: "이미지생성", score: 54 },
  { subject: "업무활용", score: 66 },
];

export function LearningLineChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={weeklyLearning} margin={{ left: -18, right: 8, top: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="hoursGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#FF8A65" stopOpacity={0.32} />
            <stop offset="95%" stopColor="#FF8A65" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <XAxis axisLine={false} dataKey="day" tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            boxShadow: "0 12px 32px rgba(31,41,55,0.08)",
          }}
        />
        <Area
          dataKey="hours"
          fill="url(#hoursGradient)"
          name="학습시간"
          stroke="#FF8A65"
          strokeWidth={3}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CompetencyRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={competency} outerRadius={92}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: "#6B7280", fontSize: 12 }} />
        <Radar dataKey="score" fill="#FFB74D" fillOpacity={0.35} stroke="#FF8A65" strokeWidth={2} />
        <Tooltip
          contentStyle={{
            border: "1px solid #E5E7EB",
            borderRadius: 14,
            boxShadow: "0 12px 32px rgba(31,41,55,0.08)",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
