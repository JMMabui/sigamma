import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { FastifyTypeInstance } from '../../type'
import z from 'zod'
import dayjs from 'dayjs'
import {
  createTransactionHistory,
  deleteTransactionHistory,
  listAllTransactionHistory,
  updateTransactionHistory,
} from '../../models/finances/transactionHistory'

export const transactionHistory: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/transaction-history',
    {
      schema: {
        tags: ['finance-Transaction-History'],
        summary: 'create Transaction History',
        description: 'create Transaction History',
        body: z.object({
          paymentId: z.string(),
          description: z.string(),
          transactionDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid()),
          amount: z.number(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { paymentId, description, transactionDate, amount } = request.body

        const transactionHistory = await createTransactionHistory({
          paymentId,
          description,
          transactionDate: new Date(transactionDate),
          amount,
        })
        return reply.status(201).send(transactionHistory)
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

  app.get('/transaction-history', async (request, reply) => {
    try {
      const transactionHistory = await listAllTransactionHistory()
      reply.status(200).send(transactionHistory)
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({
          message: (error as Error).message,
        })
      }
      return reply.status(500).send({ message: 'Internal server error' })
    }
  })

  app.put(
    '/transaction-history/:id',
    {
      schema: {
        tags: ['finance-Transaction-History'],
        summary: 'update Transaction History',
        description: 'update Transaction History',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          paymentId: z.string(),
          description: z.string(),
          transactionDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid()),
          amount: z.number(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const { paymentId, description, transactionDate, amount } = request.body
        const transactionHistory = await updateTransactionHistory(id, {
          paymentId,
          description,
          transactionDate: new Date(transactionDate),
          amount,
        })
        return reply.status(200).send(transactionHistory)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
          return reply.status(500).send({ message: 'Internal server error' })
        }
      }
    }
  )

  app.delete(
    '/transaction-history/:id',
    {
      schema: {
        tags: ['finance-Transaction-History'],
        summary: 'delete Transaction History',
        description: 'delete Transaction History',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        await deleteTransactionHistory(id)
        return reply.status(204).send()
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
          return reply.status(500).send({ message: 'Internal server error' })
        }
      }
    }
  )
}
