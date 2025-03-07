import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { FastifyTypeInstance } from '../../type'
import z from 'zod'
import {
  createTuitionFee,
  deleteTuitionFee,
  updateTuitionFee,
} from '../../models/finances/tuitionFee'

export const tuitionFee: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/tuition-fee',
    {
      schema: {
        tags: ['finance-Tuition-Fee'],
        summary: 'create tuition fee',
        description: 'create tuition fee',
        body: z.object({
          courseId: z.string(),
          year: z.number(),
          semester: z.number(),
          amount: z.number(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { courseId, year, semester, amount } = request.body
        const tuitionFee = await createTuitionFee({
          courseId,
          year,
          semester,
          amount,
        })
        return reply.status(201).send(tuitionFee)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
        }
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.get(
    '/tuition-fee',
    {
      schema: {
        tags: ['finance-Tuition-Fee'],
        summary: 'get all tuition fee',
        description: 'get all tuition fee',
      },
    },
    async (request, reply) => {
      try {
        return reply.status(200).send({
          message: 'get all tuition fee',
        })
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
        }
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.put(
    '/tuition-fee/:id',
    {
      schema: {
        tags: ['finance-Tuition-Fee'],
        summary: 'update tuition fee',
        description: 'update tuition fee',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          courseId: z.string(),
          amount: z.number(),
          year: z.number(),
          semester: z.number(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const { courseId, amount, year, semester } = request.body
        const tuitionFee = await updateTuitionFee(id, {
          courseId,
          amount,
          year,
          semester,
        })
        return reply.status(200).send(tuitionFee)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
        }
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.delete(
    '/tuition-fee/:id',
    {
      schema: {
        tags: ['finance-Tuition-Fee'],
        summary: 'delete tuition fee',
        description: 'delete tuition fee',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        await deleteTuitionFee(id)
        return reply.status(200).send({
          message: 'delete tuition fee',
        })
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
        }
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )
}
