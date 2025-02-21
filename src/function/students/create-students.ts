import type {
  Gender,
  MaritalStatus,
  ProvincyAddress,
  Type,
} from '@prisma/client'
import { prismaClient } from '../../database/script'

interface createUserRequest {
  // Gerado através de uma função que gera um id único de acordo com os requisitos
  id: string
  surname: string
  name: string
  dataOfBirth: Date
  placeOfBirth: string
  gender: Gender
  maritalStatus: MaritalStatus
  provincyAddress: ProvincyAddress
  address: string
  fatherName: string
  motherName: string
  documentType: Type
  documentNumber: string
  documentIssuedAt: Date
  documentExpiredAt: Date
  nuit: number
  login_id: string | null
}

export async function createStudents({
  id,
  surname,
  name,
  dataOfBirth,
  placeOfBirth,
  gender,
  maritalStatus,
  provincyAddress,
  address,
  fatherName,
  motherName,
  documentType,
  documentNumber,
  documentIssuedAt,
  documentExpiredAt,
  nuit,
  login_id,
}: createUserRequest) {
  console.log('bd Inicializado')

  try {
    const student = await prismaClient.student.create({
      data: {
        id,
        surname,
        name,
        dataOfBirth,
        placeOfBirth,
        gender,
        maritalStatus,
        provincyAddress,
        address,
        fatherName,
        motherName,
        documentType,
        documentNumber,
        documentIssuedAt,
        documentExpiredAt,
        nuit,
        login_id,
      },
    })

    // Caso a criação do estudante seja bem-sucedida, pode retornar uma resposta ou apenas continuar o fluxo
    console.log('Estudante criado com sucesso:', student)
    return student // ou outra resposta que você precise
  } catch (error) {
    // Captura de erro
    console.error('Erro ao criar o estudante:', error)
  }
}
