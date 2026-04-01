// lib/students.ts
import { prisma } from "@/lib/prisma";
import { calculateAttendancePercentage } from "@/lib/utils";
import { cache } from "react";

export const getAllStudentsWithStats = cache(async () => {
  const students = await prisma.student.findMany({
    include: {
      class: true,
      reward: true,
      achievements: true,
      attendance: { select: { status: true } },
      participation: { select: { score: true } },
    },
    orderBy: [{ class: { name: "asc" } }, { name: "asc" }],
  });
  return students.map((s: any) => {
    const present = s.attendance.filter((a: any) => a.status === "present").length;
    return {
      ...s,
      attendancePct: calculateAttendancePercentage(present, s.attendance.length),
      avgParticipation: s.participation.length > 0
        ? Math.round(s.participation.reduce((sum: number, p: any) => sum + p.score, 0) / s.participation.length)
        : 0,
    };
  });
});