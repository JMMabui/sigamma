import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { FastifyTypeInstance } from '../../type'
import { z } from 'zod'
import dayjs from 'dayjs'
import {
  createInvoice,
  deleteInvoice,
  getInvoiceById,
  listAllInvoice,
  updateInvoice,
} from '../../models/finances/invoice'

export const Invoice: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/invoice',
    {
      schema: {
        tags: ['Finance_invoice'],
        summary: 'Create invoice',
        description: 'Create invoice',
        body: z.object({
          studentId: z.string(),
          amount: z.number(),
          dueDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid(), {
              message: 'Formato de data inválido. Esperado: YYYY-MM-DD',
            }),
          status: z.enum(['PENDING', 'PAID', 'OVERDUE']),
          penaltyAmount: z.number(),
          discountAmount: z.number(),
          totalAmount: z.number(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const {
          studentId,
          amount,
          dueDate,
          status,
          penaltyAmount,
          discountAmount,
          totalAmount,
        } = request.body

        const invoice = await createInvoice({
          studentId,
          amount,
          dueDate: new Date(dueDate), // Converter para Date
          status,
          penaltyAmount,
          discountAmount,
          totalAmount,
        })

        return reply.code(201).send(invoice)
      } catch (error) {
        // Caso ocorra um erro de validação ou outro erro
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação',
            errors: error.errors,
          })
        }

        // Erro inesperado
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.get(
    '/invoice',
    {
      schema: {
        tags: ['Finance_invoice'],
        summary: 'Get all invoices',
        description: 'Get all invoices',
      },
    },
    async (request, reply) => {
      try {
        const invoices = await listAllInvoice()
        return reply.code(200).send(invoices)
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.get(
    '/invoice/:id',
    {
      schema: {
        tags: ['Finance_invoice'],
        summary: 'get invoice by id',
        description: 'Get invoice by id',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const invoice = await getInvoiceById(id)
        return reply.code(200).send(invoice)
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.put(
    '/invoice/:id',
    {
      schema: {
        tags: ['Finance_invoice'],
        summary: 'Update invoice',
        description: 'Update invoice',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          studentId: z.string(),
          amount: z.number(),
          dueDate: z
            .string()
            .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid(), {
              message: 'Formato de data inválido. Esperado: YYYY-MM-DD',
            }),
          status: z.enum(['PENDING', 'PAID', 'OVERDUE']),
          penaltyAmount: z.number(),
          discountAmount: z.number(),
          totalAmount: z.number(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const {
          studentId,
          amount,
          dueDate,
          status,
          penaltyAmount,
          discountAmount,
          totalAmount,
        } = request.body
        const invoice = await updateInvoice(id, {
          studentId,
          amount,
          dueDate: new Date(dueDate), // Converter para Date
          status,
          penaltyAmount,
          discountAmount,
          totalAmount,
        })
        return reply.code(200).send(invoice)
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.delete(
    '/invoice/:id',
    {
      schema: {
        tags: ['Finance_invoice'],
        summary: 'Delete invoice',
        description: 'Delete invoice',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        await deleteInvoice(id)
        return reply.code(204).send()
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error' })
      }
    }
  )
}
