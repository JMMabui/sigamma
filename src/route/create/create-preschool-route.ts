import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createPreschool } from '../../function/preschool/create-preschool'

export const createdPreSchool: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/pre-school', async (request, reply) => {
    const createPreSchoolSchema = z.object({
      schoolLevel: z.enum(['CLASSE_10', 'CLASSE_12', 'LICENCIATURA']),
      schoolName: z.string(),
      schoolProvince: z.enum([
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
    })

    try {
      const body = createPreSchoolSchema.parse(request.body)

      await createPreschool({
        schoolLevel: body.schoolLevel,
        schoolName: body.schoolName,
        schoolProvincy: body.schoolProvince,
      })

      reply.code(201).send({ message: 'pre-school created successfully' })
      console.log(body)
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
