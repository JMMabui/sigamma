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
  const course = await prismaClient.course.create({
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

  return course
}

// Função para buscar o curso pelo ID
export async function findCourseById(course_id: string) {
  // Simulação de busca no banco de dados
  return await prismaClient.course.findUnique({ where: { id: course_id } })
}

// Função para atualizar as vagas disponíveis no curso
export async function updateCourseVacancies(course_id: string) {
  // Decrementa 1 na quantidade de vagas disponíveis
  return await prismaClient.course.update({
    where: { id: course_id },
    data: { availableVacancies: { decrement: 1 } },
  })
}
