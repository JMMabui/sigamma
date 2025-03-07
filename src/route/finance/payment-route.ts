import type { FastifyPluginAsync } from 'fastify'
import type { FastifyTypeInstance } from '../../type'
import z from 'zod'
import dayjs from 'dayjs'
import {
  createPayment,
  deletePayment,
  listAllPayments,
  updatePayment,
} from '../../models/finances/payment'

export const payment: FastifyPluginAsync = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/payments',
    {
      schema: {
        tags: ['finance_payment'],
        summary: 'create a payment',
        description: 'create a payment',
        body: z.object({
          invoiceId: z.string(),
          amount: z.number(),
          method: z.enum([
            'CREDIT_CARD',
            'DEBIT_CARD',
            'BANK_TRANSFER',
            'MOBILE_MONEY',
            'CASH',
          ]),
          paymentDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid()),
          status: z.enum(['PENDING', 'CONFIRMED', 'FAILED']),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { invoiceId, amount, method, paymentDate, status } = request.body
        const payment = await createPayment({
          invoiceId,
          amount,
          method,
          paymentDate: new Date(paymentDate),
          status,
        })
        reply.status(201).send(payment)
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
    '/payments',
    {
      schema: {
        tags: ['finance_payment'],
        summary: 'get all payments',
        description: 'get all payments',
      },
    },
    async (request, reply) => {
      try {
        const payments = await listAllPayments()
        reply.status(200).send(payments)
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
    '/payments/:id',
    {
      schema: {
        tags: ['finance_payment'],
        summary: 'update a payment',
        description: 'update a payment',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          invoiceId: z.string(),
          amount: z.number(),
          method: z.enum([
            'CREDIT_CARD',
            'DEBIT_CARD',
            'BANK_TRANSFER',
            'MOBILE_MONEY',
            'CASH',
          ]),
          paymentDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid()),
          status: z.enum(['PENDING', 'CONFIRMED', 'FAILED']),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const { invoiceId, amount, method, paymentDate, status } = request.body
        const payment = await updatePayment(id, {
          invoiceId,
          amount,
          method,
          paymentDate: new Date(paymentDate),
          status,
        })
        return reply.status(200).send(payment)
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
    '/payments/:id',
    {
      schema: {
        tags: ['finance_payment'],
        summary: 'delete a payment',
        description: 'delete a payment',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        await deletePayment(id)
        return reply.status(204).send()
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
