import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createDiscipline } from '../../function/registration/disciplines/create-disciplines'

export const createDisciplines: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/disciplines', async (request, reply) => {
    const createDisciplinesSchema = z.object({
      codigo: z.string(),
      disciplineName: z.string(),
      year_study: z.enum([
        'PRIMEIRO_ANO',
        'SEGUNDO_ANO',
        'TERCEIRO_ANO',
        'QUARTO_ANO',
      ]),
      semester: z.enum(['PRIMEIRO_SEMESTRE', 'SEGUNDO_SEMESTRE']),
      hcs: z.number(),
      credits: z.number(),
      disciplineType: z.enum(['COMPLEMENTAR', 'NUCLEAR']),
    })

    try {
      const body = createDisciplinesSchema.parse(request.body)
      await createDiscipline({
        codigo: body.codigo,
        credits: body.credits,
        disciplineName: body.disciplineName,
        disciplineType: body.disciplineType,
        hcs: body.hcs,
        semester: body.semester,
        year_study: body.year_study,
      })

      return reply
        .code(201)
        .send({ message: 'Discipline created successfully' })
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
