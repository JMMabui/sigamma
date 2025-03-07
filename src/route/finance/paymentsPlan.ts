import type { FastifyPluginAsync } from 'fastify'
import type { FastifyTypeInstance } from '../../type'
import z from 'zod'
import dayjs from 'dayjs'
import {
  createPaymentPlan,
  deletePaymentPlan,
  listAllPaymentsPlans,
  updatePaymentPlan,
} from '../../models/finances/paymentPlan'

export const paymentsPlane: FastifyPluginAsync = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/payments-plane',
    {
      schema: {
        tags: ['finance-payments-plane'],
        summary: 'Criar um plano de pagamento',
        description: 'Criar um plano de pagamento',
        body: z.object({
          invoiceId: z.string(),
          totalAmount: z.number(),
          numInstallments: z.number(),
          installmentAmount: z.number(),
          dueDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid()),
        }),
      },
    },
    async (request, reply) => {
      try {
        const {
          invoiceId,
          totalAmount,
          numInstallments,
          installmentAmount,
          dueDate,
        } = request.body
        const paymentsPlane = await createPaymentPlan({
          invoiceId,
          totalAmount,
          numInstallments,
          installmentAmount,
          dueDate: new Date(dueDate),
        })
        return reply.status(201).send(paymentsPlane)
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
    '/payments-plane',
    {
      schema: {
        tags: ['finance-payments-plane'],
        summary: 'Listar todos os planos de pagamento',
        description: 'Listar todos os planos de pagamento',
      },
    },
    async (request, reply) => {
      try {
        const paymentsPlane = await listAllPaymentsPlans()
        return reply.status(200).send(paymentsPlane)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
        }
      }
      return reply.status(500).send({ message: 'Internal server error' })
    }
  )

  app.put(
    '/payments-plane/:id',
    {
      schema: {
        tags: ['finance-payments-plane'],
        summary: 'Atualizar um plano de pagamento',
        description: 'Atualizar um plano de pagamento',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          invoiceId: z.string(),
          totalAmount: z.number(),
          numInstallments: z.number(),
          installmentAmount: z.number(),
          dueDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid()),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const {
          invoiceId,
          totalAmount,
          numInstallments,
          installmentAmount,
          dueDate,
        } = request.body
        const paymentsPlane = await updatePaymentPlan(id, {
          invoiceId,
          totalAmount,
          numInstallments,
          installmentAmount,
          dueDate: new Date(dueDate),
        })
        return reply.status(200).send(paymentsPlane)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
        }
      }
      return reply.status(500).send({ message: 'Internal server error' })
    }
  )

  app.delete(
    '/payments-plane/:id',
    {
      schema: {
        tags: ['finance-payments-plane'],
        summary: 'Deletar um plano de pagamento',
        description: 'Deletar um plano de pagamento',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const paymentsPlane = await deletePaymentPlan(id)
        return reply.status(200).send(paymentsPlane)
      } catch (error) {
        if (error instanceof Error) {
          reply.status(400).send({
            message: (error as Error).message,
          })
        }
      }
      return reply.status(500).send({ message: 'Internal server error' })
    }
  )
}
