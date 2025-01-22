import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'
import { z } from 'zod'

export const updateAcessData: FastifyPluginAsyncZod = async (app, opts) => {
  app.put('/update/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    })

    try {
      const { id } = paramsSchema.parse(request.params)
      const { email, password } = bodySchema.parse(request.body)
      const updatedAt = new Date().toISOString()

      await prismaClient.acessData.update({
        where: {
          id,
        },
        data: {
          email,
          password,
          updatedAt,
        },
      })
      return reply.status(200).send({ message: 'User updated successfully' })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: 'Erro de validação',
          errors: error.errors,
        })
      }
      return reply.code(500).send({ message: 'Internal server error' })
    }
  })
}
