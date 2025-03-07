import type { Semester, StatusClasses, YearStudy } from '@prisma/client'

interface ClassesSchema {
  className: string
  courseId: string
  year: string
  yearStudy: YearStudy
  semester: Semester
  status: StatusClasses
}

export async function createClasses({
  className,
  courseId,
  year,
  yearStudy,
  semester,
  status,
}: ClassesSchema) {}
