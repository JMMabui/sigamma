import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { FastifyTypeInstance } from '../../type'
import z from 'zod'
import {
  createDiscount,
  deleteDiscount,
  getDiscountById,
  listAllDiscounts,
  updateDiscount,
} from '../../models/finances/discount'

export const discount: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/discount',
    {
      schema: {
        tags: ['Finance_discount'],
        summary: 'Create discount',
        description: 'Create discount',
        body: z.object({
          invoiceId: z.string(),
          amount: z.number(),
          reason: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { invoiceId, amount, reason } = request.body

        const discount = await createDiscount({
          invoiceId,
          amount,
          reason,
        })
        return reply.status(201).send(discount)
      } catch (error) {
        return reply.status(500).send({ error: 'Erro ao criar desconto' })
      }
    }
  )

  app.get(
    '/discount',
    {
      schema: {
        tags: ['Finance_discount'],
        summary: 'List all discounts',
        description: 'List all discounts',
      },
    },
    async (request, reply) => {
      try {
        const discounts = await listAllDiscounts()
        return reply.status(200).send(discounts)
      } catch (error) {
        return reply.status(500).send({ error: 'Erro ao obter descontos' })
      }
    }
  )

  app.get(
    '/discount/:id',
    {
      schema: {
        tags: ['Finance_discount'],
        summary: 'Get discount by id',
        description: 'Get discount by id',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const discount = await getDiscountById(id)
        return reply.status(200).send(discount)
      } catch (error) {
        return reply.status(500).send({ error: 'Erro ao obter desconto' })
      }
    }
  )

  app.put(
    '/discount/:id',
    {
      schema: {
        tags: ['Finance_discount'],
        summary: 'Update discount',
        description: 'Update discount',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          invoiceId: z.string(),
          amount: z.number(),
          reason: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const { invoiceId, amount, reason } = request.body
        const discount = await updateDiscount(id, {
          invoiceId,
          amount,
          reason,
        })
        return reply.status(200).send(discount)
      } catch (error) {
        return reply.status(500).send({ error: 'Erro ao atualizar desconto' })
      }
    }
  )

  app.delete(
    '/discount/:id',
    {
      schema: {
        tags: ['Finance_discount'],
        summary: 'Delete discount',
        description: 'Delete discount',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        await deleteDiscount(id)
        return reply.status(204).send()
      } catch (error) {
        return reply.status(500).send({ error: 'Erro ao excluir desconto' })
      }
    }
  )
}
