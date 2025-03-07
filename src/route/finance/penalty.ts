import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { FastifyTypeInstance } from '../../type'
import z from 'zod'
import {
  createPenalty,
  deletePenalty,
  getPenaltyById,
  listAllPenalty,
  updatePenalty,
} from '../../models/finances/penalty'

export const penalty: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/penalty',
    {
      schema: {
        tags: ['finance-penalty'],
        summary: 'create penalty',
        description: 'create penalty',
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
        const penalty = await createPenalty({
          invoiceId,
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

  app.get('/penalty', async (request, reply) => {
    try {
      const penalties = await listAllPenalty()
      return penalties
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message })
      } else {
        reply.status(500).send({ error: 'Internal Server Error' })
      }
    }
  })

  app.put(
    '/penalty/:id',
    {
      schema: {
        tags: ['finance-penalty'],
        summary: 'update penalty',
        description: 'update penalty',
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
        const penalty = await updatePenalty(id, {
          invoiceId,
          amount,
          reason,
        })
        return penalty
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
    '/penalty/:id',
    {
      schema: {
        tags: ['finance-penalty'],
        summary: 'delete penalty',
        description: 'delete penalty',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const penalty = await deletePenalty(id)
        return penalty
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
    '/penalty/:id',
    {
      schema: {
        tags: ['finance-penalty'],
        summary: 'get penalty by id',
        description: 'get penalty by id',
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params
        const penalty = await getPenaltyById(id)
        return penalty
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
