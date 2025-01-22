import type { PreLevel, ProvincyAddress } from '@prisma/client'
import { prismaClient } from '../../../database/script'

interface preschoolRequest {
  schoolLevel: PreLevel
  schoolName: string
  schoolProvincy: ProvincyAddress
}

export async function createPreschool({
  schoolLevel,
  schoolName,
  schoolProvincy,
}: preschoolRequest) {
  await prismaClient.preSchool.create({
    data: {
      schoolLevel,
      schoolName,
      schoolProvincy,
    },
  })
}
