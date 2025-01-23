import type { DisciplineType, Semester, YearStudy } from '@prisma/client'
import { prismaClient } from '../../../../database/script'

interface createDisciplinesRequest {
  codigo: string
  disciplineName: string
  year_study: YearStudy
  semester: Semester
  hcs: number
  credits: number
  disciplineType: DisciplineType
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
  await prismaClient.discipline.create({
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
}
