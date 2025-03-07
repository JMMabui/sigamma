import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import type { FastifyTypeInstance } from '../../type'
import {
  createRefund,
  deleteRefund,
  listAllRefund,
  updateRefund,
} from '../../models/finances/refund'

export const refund: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/refund',
    {
      schema: {
        tags: ['finance-refund'],
        summary: 'create refund',
        description: 'create refund',
        body: z.object({
          paymentId: z.string(),
          amount: z.number(),
          reason: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { paymentId, amount, reason } = request.body
        const refund = await createRefund({
          paymentId,
          amount,
          reason,
        })
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({ error: error.message })
        } else {
          reply.status(500).send({ error: 'Internal Server Error' })
        }
      }
    }
  )

  app.get(
    '/refund',
    {
      schema: {
        tags: ['finance-refund'],
        summary: 'list all refund',
        description: 'list all refund',
      },
    },
    async (request, reply) => {
      try {
        const refund = await listAllRefund()
        reply.send(refund)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({ error: error.message })
        } else {
          reply.status(500).send({ error: 'Internal Server Error' })
        }
      }
    }
  )

  app.put(
    '/refund/:id',
    {
      schema: {
        tags: ['finance-refund'],
        summary: 'update refund',
        description: 'update refund',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          paymentId: z.string(),
          amount: z.number(),
          reason: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const { paymentId, amount, reason } = request.body
        const refund = await updateRefund(id, {
          paymentId,
          amount,
          reason,
        })
        reply.send(refund)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({ error: error.message })
        } else {
          reply.status(500).send({ error: 'Internal Server Error' })
        }
      }
    }
  )

  app.delete(
    '/refund/:id',
    {
      schema: {
        tags: ['finance-refund'],
        summary: 'delete refund',
        description: 'delete refund',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const refund = await deleteRefund(id)
        reply.send(refund)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({ error: error.message })
        } else {
          reply.status(500).send({ error: 'Internal Server Error' })
        }
      }
    }
  )
}
