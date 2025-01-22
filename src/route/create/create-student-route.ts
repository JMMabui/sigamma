import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import dayjs from 'dayjs'
import { createStudents } from '../../function/students/create-students'

export const createdStudents: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/students', async (request, reply) => {
    function generateId() {
      const year = new Date().getFullYear() // Obtém o ano atual
      const randomDigits = Math.floor(1000 + Math.random() * 9000) // Garante 4 dígitos aleatórios
      const id = `${year}${randomDigits}`
      return id
    }

    const createUserSchema = z.object({
      surname: z.string(),
      name: z.string(),
      dataOfBirth: z
        .string()
        .refine(
          date => {
            return dayjs(date, 'YYYY-MM-DD', true).isValid()
          },
          { message: 'Invalid date format' }
        )
        .transform(date => {
          return dayjs(date, 'YYYY-MM-DD').toDate()
        }),
      placeOfBirth: z.string(),
      gender: z.enum(['MASCULINO', 'FEMININO']),
      maritalStatus: z.enum(['SOLTEIRO', 'CASADO', 'DIVORCIADO', 'VIUVO']),
      provincyAddress: z.enum([
        'MAPUTO_CIDADE',
        'MAPUTO_PROVINCIA',
        'GAZA',
        'INHAMBANE',
        'MANICA',
        'SOFALA',
        'TETE',
        'ZAMBEZIA',
        'NAMPULA',
        'CABO_DELGADO',
        'NIASSA',
      ]),
      address: z.string(),
      fatherName: z.string(),
      motherName: z.string(),
      documentType: z.enum(['BI', 'PASSAPORTE']),
      documentNumber: z.string(),
      documentIssuedAt: z
        .string()
        .refine(
          date => {
            return dayjs(date, 'YYYY-MM-DD', true).isValid()
          },
          { message: 'Invalid date format' }
        )
        .transform(date => {
          return dayjs(date, 'YYYY-MM-DD').toDate()
        }),
      documentExpiredAt: z
        .string()
        .refine(
          date => {
            return dayjs(date, 'YYYY-MM-DD', true).isValid()
          },
          { message: 'Invalid date format' }
        )
        .transform(date => {
          return dayjs(date, 'YYYY-MM-DD').toDate()
        }),
      nuit: z.number().refine(nuit => nuit.toString().length === 9, {
        message: 'O NUIT deve ter exatamente 9 dígitos',
      }),
    })

    try {
      const body = createUserSchema.parse(request.body)

      const genderUpCase = body.gender.toUpperCase()

      await createStudents({
        id: generateId(),
        surname: body.surname,
        name: body.name,
        dataOfBirth: body.dataOfBirth,
        placeOfBirth: body.placeOfBirth,
        gender: body.gender,
        maritalStatus: body.maritalStatus,
        provincyAddress: body.provincyAddress,
        address: body.address,
        fatherName: body.fatherName,
        motherName: body.motherName,
        documentType: body.documentType,
        documentNumber: body.documentNumber,
        documentIssuedAt: body.documentIssuedAt,
        documentExpiredAt: body.documentExpiredAt,
        nuit: body.nuit,
      })

      reply.code(201).send({ message: 'User created successfully' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: 'Erro de validação',
          errors: error.errors,
        })
      }
      reply.code(500).send({ message: 'Internal server error' })
    }
  })
}
