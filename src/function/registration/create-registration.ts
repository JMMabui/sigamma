import type { Status } from '@prisma/client'
import { prismaClient } from '../../database/script'

interface createRegistrationRequest {
  course_id: string
  student_id: string
}

interface createRegistrationRequestWithStatus
  extends createRegistrationRequest {
  registrationStatus: Status
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

export const createRegistrationWithConfirmationStatus = async ({
  course_id,
  student_id,
  registrationStatus,
}: createRegistrationRequestWithStatus) => {
  const registration = await prismaClient.registration.create({
    data: {
      course_id,
      student_id,
      registrationStatus,
    },
  })
  return registration
}
