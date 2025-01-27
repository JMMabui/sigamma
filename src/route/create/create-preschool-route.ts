import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createdPreInstituto } from '../../function/preInstitute/create-preInstituto'
import { insertEducationOffice } from '../../function/students/educationOfficers'
import dayjs from 'dayjs'
import type { FastifyTypeInstance } from '../../type'

export const createdPreInstitutos: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/pre-instituto',
    {
      schema: {
        tags: ['pre-school'],
        description: 'create a pre school information',
        body: z.object({
          fullName: z.string(),
          profession: z.string(),
          dataOfBirth: z
            .string()
            .refine(data => {
              return (
                // biome-ignore lint/style/noCommaOperator: <explanation>
                dayjs(data, 'YYYY-MM-DD', true).isValid(),
                { message: 'Invalid date format' }
              )
            })
            .transform(data => {
              return dayjs(data, 'YYYY-MM-DD').toDate()
            }),
          email: z.string().email(),
          contact: z.string(),
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
        }),
      },
    },
    async (request, reply) => {
      const createPreSchoolSchema = z.object({
        schoolLevel: z.enum(['CLASSE_10', 'CLASSE_12', 'LICENCIATURA']),
        schoolName: z.string(),
        schoolProvincy: z.enum([
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
        student_id: z.string(),
      })

      try {
        const { schoolLevel, schoolName, schoolProvincy, student_id } =
          createPreSchoolSchema.parse(request.body)
        const {
          fullName,
          profession,
          dataOfBirth,
          email,
          contact,
          provincyAddress,
          address,
        } = request.body

        await createdPreInstituto({
          schoolLevel,
          schoolName,
          schoolProvincy,
          student_id,
        })

        if (schoolLevel === 'CLASSE_10') {
          await insertEducationOffice({
            fullName,
            profession,
            dataOfBirth,
            email,
            contact,
            provincyAddress,
            address,
          })
        }

        reply.code(201).send({ message: 'pre-instituto created successfully' })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação',
            errors: error.errors,
          })
        }
        reply.code(500).send({ message: 'Internal server error' })
      }
    }
  )
}
