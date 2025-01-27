import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createRegistration } from '../../function/registration/create-registration'
import { prismaClient } from '../../../database/script'

export const createRegistrations: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/registration', async (request, reply) => {
    const createRegistrationRequest = z.object({
      course_id: z.string(),
      student_id: z.string(),
    })

    try {
      const { course_id, student_id } = createRegistrationRequest.parse(
        request.body
      )
      await createRegistration({
        course_id,
        student_id,
      })

      reply.code(201).send({ message: 'enrollment created successfully' })
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

  app.put('/registration-status/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(), // Garantir que o id seja um UUID
    })

    const bodySchema = z.object({
      registrationStatus: z.enum([
        'PENDENTE',
        'CONFIRMADO',
        'CANCELADO',
        'TRANCADO',
        'INSCRITO',
        'NAO_INSCRITO',
      ]),
    })

    try {
      const { id } = paramsSchema.parse(request.params)
      const { registrationStatus } = bodySchema.parse(request.body)

      // Verificar se o registro existe
      const registration = await prismaClient.registration.findUnique({
        where: { id }, // ou { id: id }, dependendo do seu banco
      })

      if (!registration) {
        return reply.status(404).send({ message: 'Registro não encontrado' })
      }

      // Atualizar o status de registro
      await prismaClient.registration.update({
        where: { id }, // ou { id: id }, dependendo do seu banco
        data: { registrationStatus },
      })

      return reply.code(200).send({
        message: `Status de registro atualizado para ${registrationStatus} com sucesso`,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: 'Erro de validação',
          errors: error.errors,
        })
      }

      return reply.status(500).send({ message: 'Erro interno no servidor' })
    }
  })
}
