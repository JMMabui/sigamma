import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'
import z from 'zod'

export const getRegistration: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/registration', async (request, reply) => {
    const registration = await prismaClient.registration.findMany()
    return { registration }
  })
}

export const getRegistrationId: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/registration/:id', async (request, reply) => {
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

    const registration = await prismaClient.registration.findUnique({
      where: { id },
    })

    if (!registration) {
      return reply.status(404).send({ message: 'Matrícula não encontrada' })
    }

    return reply
      .status(200)
      .send({ message: 'Matrícula encontrada', registration })
  })
}

export const getRegistrationInCourse: FastifyPluginAsyncZod = async (
  app,
  opts
) => {
  app.get('/registration-course/:id', async (request, reply) => {
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

    const registration = await prismaClient.registration.findMany({
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
      .send({ message: 'Matrículas encontradas', registration })
  })
}

export const getRegistrationInStudent: FastifyPluginAsyncZod = async (
  app,
  opts
) => {
  app.get('/registration-student/:id', async (request, reply) => {
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

    const registration = await prismaClient.registration.findMany({
      where: { id },
    })

    return reply
      .status(200)
      .send({ message: 'Matrículas encontradas', registration })
  })
}
