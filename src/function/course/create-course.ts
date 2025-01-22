import type { LevelCourse, Period } from '@prisma/client'
import { prismaClient } from '../../../database/script'

interface createCourseRequest {
  courseName: string
  courseDescription: string
  courseDuration: number
  levelCourse: LevelCourse
  period: Period
  totalVacancies: number
  availableVacancies: number
}

export async function createCourse({
  courseName,
  courseDescription,
  courseDuration,
  levelCourse,
  period,
  totalVacancies,
  availableVacancies,
}: createCourseRequest) {
  await prismaClient.course.create({
    data: {
      courseName,
      courseDescription,
      courseDuration,
      levelCourse,
      period,
      totalVacancies,
      availableVacancies,
    },
  })
}
