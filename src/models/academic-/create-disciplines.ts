import type { DisciplineType, Semester, YearStudy } from '@prisma/client'
import { prismaClient } from '../../database/script'

interface createDisciplinesRequest {
  codigo: string
  disciplineName: string
  year_study: YearStudy
  semester: Semester
  hcs: number
  credits: number
  disciplineType: DisciplineType
}

interface createSubjectsResponse extends createDisciplinesRequest {
  courseId: string
}

export async function createDiscipline({
  codigo,
  credits,
  disciplineName,
  disciplineType,
  hcs,
  semester,
  year_study,
}: createDisciplinesRequest) {
  const subject = await prismaClient.discipline.create({
    data: {
      codigo,
      credits,
      disciplineName,
      disciplineType,
      hcs,
      semester,
      year_study,
    },
  })

  return subject
}

export async function createSubjects({
  codigo,
  credits,
  disciplineName,
  disciplineType,
  hcs,
  semester,
  year_study,
  courseId,
}: createSubjectsResponse) {
  try {
    console.log('Criando disciplina com os seguintes dados:', {
      codigo,
      credits,
      disciplineName,
      disciplineType,
      hcs,
      semester,
      year_study,
      courseId,
    })

    const subject = await prismaClient.discipline.create({
      data: {
        codigo,
        credits,
        disciplineName,
        disciplineType,
        hcs,
        semester,
        year_study,
        courseId,
      },
    })

    console.log('Disciplina criada com sucesso:', subject)
    return subject
  } catch (error) {
    console.error('Erro ao criar disciplina:', error)
    throw error // Re-lança o erro para que ele seja tratado na camada superior
  }
}

export function findSubjectByCodigo(codigo: string) {
  return prismaClient.discipline.findFirst({
    where: {
      codigo,
    },
  })
}
