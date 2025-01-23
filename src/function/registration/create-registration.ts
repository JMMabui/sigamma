import { prismaClient } from '../../../database/script'

interface createRegistrationRequest {
  courseId: string
  student_id: string
}

export const createRegistration = async ({
  courseId,
  student_id,
}: createRegistrationRequest) => {
  const registration = await prismaClient.registration.create({
    data: {
      courseId,
      student_id,
    },
  })
  return registration
}
