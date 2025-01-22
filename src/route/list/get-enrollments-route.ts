import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'
import z from 'zod'

export const getEnrollments: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/enrollment', async (request, reply) => {
    const enrollment = await prismaClient.enrollment.findMany()
    return { enrollment }
  })
}

export const getEnrollmentId: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/enrollment/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const result = paramsSchema.safeParse(request.params)

    if (!result.success) {
      return reply.status(400).send({
        message: 'ID inválido',
        errors: result.error.errors,
      })
    }
    const { id } = result.data

    const enrollment = await prismaClient.enrollment.findUnique({
      where: { id },
    })

    if (!enrollment) {
      return reply.status(404).send({ message: 'Matrícula não encontrada' })
    }

    return reply
      .status(200)
      .send({ message: 'Matrícula encontrada', enrollment })
  })
}

export const getEnrollmentInCourse: FastifyPluginAsyncZod = async (
  app,
  opts
) => {
  app.get('/enrollment-course/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const result = paramsSchema.safeParse(request.params)

    if (!result.success) {
      return reply.status(400).send({
        message: 'ID inválido',
        errors: result.error.errors,
      })
    }
    const { id } = result.data

    const enrollment = await prismaClient.enrollment.findMany({
      where: { id },
      select: {
        course: {
          select: {
            levelCourse: true,
            courseName: true,
            period: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
      },
    })

    return reply
      .status(200)
      .send({ message: 'Matrículas encontradas', enrollment })
  })
}

export const getEnrollmentInStudent: FastifyPluginAsyncZod = async (
  app,
  opts
) => {
  app.get('/enrollment-student/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const result = paramsSchema.safeParse(request.params)

    if (!result.success) {
      return reply.status(400).send({
        message: 'ID inválido',
        errors: result.error.errors,
      })
    }
    const { id } = result.data

    const enrollment = await prismaClient.enrollment.findMany({
      where: { id },
    })

    return reply
      .status(200)
      .send({ message: 'Matrículas encontradas', enrollment })
  })
}
