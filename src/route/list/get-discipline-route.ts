import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'

export const getDisciplineRoute: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/discipline', async (request, reply) => {
    const discipline = await prismaClient.discipline.findMany()
    return { discipline }
  })
}
