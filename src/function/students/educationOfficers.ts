import type { ProvincyAddress } from '@prisma/client'
import { prismaClient } from '../../../database/script'

interface createEducationOfficerRequest {
  fullName: string
  profession: string
  dataOfBirth: Date
  email: string
  contact: string
  provincyAddress: ProvincyAddress
  address: string
}

export async function insertEducationOffice({
  fullName,
  profession,
  dataOfBirth,
  email,
  contact,
  provincyAddress,
  address,
}: createEducationOfficerRequest) {
  const data = await prismaClient.educationOfficer.create({
    data: {
      fullName,
      profession,
      dataOfBirth,
      email,
      contact,
      provincyAddress,
      address,
    },
  })

  return data
}
