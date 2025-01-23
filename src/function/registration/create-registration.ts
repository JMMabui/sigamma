import { prismaClient } from '../../../database/script'

interface createRegistrationRequest {
  course_id: string
  student_id: string
}

export const createRegistration = async ({
  course_id,
  student_id,
}: createRegistrationRequest) => {
  const registration = await prismaClient.registration.create({
    data: {
      course_id,
      student_id,
    },
  })
  return registration
}
