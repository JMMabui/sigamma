import { prismaClient } from '../../database/script'

interface student_subject_schema {
  student_id: string
  disciplineId: string
}

export async function createStudentSubject({
  student_id,
  disciplineId,
}: student_subject_schema) {
  const student_subject = await prismaClient.studentDiscipline.create({
    data: {
      student_id,
      disciplineId,
    },
  })

  return student_subject
}
