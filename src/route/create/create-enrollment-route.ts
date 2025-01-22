import z from 'zod'
import { createEnrollment } from '../../function/enrollment/create-enrollment'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const createEnrollments: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/enrollment', async (request, reply) => {
    const createEnrollmentRequest = z.object({
      courseId: z.string(),
      student_id: z.string(),
    })

    try {
      const body = createEnrollmentRequest.parse(request.body)
      await createEnrollment({
        courseId: body.courseId,
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
