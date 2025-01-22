import { prismaClient } from '../../../database/script'

interface createEnrollmentsRequest {
  courseId: string
  student_id: string
}

export const createEnrollment = async ({
  courseId,
  student_id,
}: createEnrollmentsRequest) => {
  const enrollment = await prismaClient.enrollment.create({
    data: {
      courseId,
      student_id,
    },
  })
  return enrollment
}
