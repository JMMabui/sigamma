import { string } from 'zod'
import { prismaClient } from '../../../../database/script'

interface createAcessDataRequest {
  email: string
  contact: string
  password: string
  student_id: string
}

export async function createAcessData({
  email,
  contact,
  password,
  student_id,
}: createAcessDataRequest) {
  await prismaClient.acessData.create({
    data: {
      email,
      contact,
      password,
      student_id,
    },
  })
}
