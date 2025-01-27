import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import dayjs from 'dayjs'
import { createStudents } from '../../function/students/create-students'
import type { FastifyTypeInstance } from '../../type'
import { prismaClient } from '../../../database/script'

export const createdStudents: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/students',
    {
      schema: {
        tags: ['students'],
        description: 'create students',
        body: z.object({
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
        }),
        response: {
          201: z.null().describe('student created'),
          400: z.null().describe('Erro de validação'),
          500: z.null().describe('Internal Server error'),
        },
      },
    },
    async (request, reply) => {
      function generateId() {
        const year = new Date().getFullYear() // Obtém o ano atual
        const randomDigits = Math.floor(1000 + Math.random() * 9000) // Garante 4 dígitos aleatórios
        const id = `${year}${randomDigits}`
        return id
      }

      try {
        const {
          address,
          dataOfBirth,
          documentExpiredAt,
          documentIssuedAt,
          documentNumber,
          documentType,
          fatherName,
          gender,
          maritalStatus,
          motherName,
          name,
          nuit,
          placeOfBirth,
          provincyAddress,
          surname,
        } = request.body

        await createStudents({
          id: generateId(),
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
        })

        reply.code(201).send()
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send()
        }
        reply.code(500).send()
      }
    }
  )

  app.get(
    '/students',
    { schema: { tags: ['students'], description: 'list students' } },
    async (request, reply) => {
      const students = await prismaClient.student.findMany()
      const totalStudents = await prismaClient.student.count()
      console.log(`total de estudentes inscritos: ${totalStudents}`)
      return students
    }
  )
}
