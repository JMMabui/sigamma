import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createAcessData } from '../../function/students/acess data/create-acessData'

export const creatingAcessData: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/acess-data', async (request, reply) => {
    const createAcessDataRequest = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      contact: z.string().min(9),
      student_id: z.string(),
    })

    try {
      const body = createAcessDataRequest.parse(request.body)
      await createAcessData({
        email: body.email,
        contact: body.contact,
        password: body.password,
        student_id: body.student_id,
      })

      reply.code(201).send({ message: 'acess data created successfully' })
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
