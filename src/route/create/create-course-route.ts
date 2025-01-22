import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'
import { z } from 'zod'
import { createCourse } from '../../function/course/create-course'

export const createCourses: FastifyPluginAsyncZod = async (app, opts) => {
  app.post('/courses', async (request, reply) => {
    const createCoursesSchema = z.object({
      courseName: z.string(),
      courseDuration: z.number(),
      courseDescription: z.string(),
      levelCourse: z.enum([
        'CURTA_DURACAO',
        'TECNICO_MEDIO',
        'LICENCIATURA',
        'MESTRADO',
        'RELIGIOSO',
      ]),
      period: z.enum(['LABORAL', 'POS_LABORAL']),
      totalVacancies: z.number(),
      availableVacancies: z.number(),
    })

    try {
      const body = createCoursesSchema.parse(request.body)
      await createCourse({
        courseName: body.courseName,
        courseDuration: body.courseDuration,
        courseDescription: body.courseDescription,
        levelCourse: body.levelCourse,
        period: body.period,
        totalVacancies: body.totalVacancies,
        availableVacancies: body.availableVacancies,
      })

      return reply.code(201).send({ message: 'Course created successfully' })
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
