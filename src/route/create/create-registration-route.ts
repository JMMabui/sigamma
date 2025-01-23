import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createRegistration } from '../../function/registration/create-registration'

export const createRegistrations: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/registration', async (request, reply) => {
    const createRegistrationRequest = z.object({
      courseId: z.string(),
      student_id: z.string(),
    })

    try {
      const body = createRegistrationRequest.parse(request.body)
      await createRegistration({
        course_id: body.courseId,
        student_id: body.student_id,
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
}
