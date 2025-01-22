import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'

export const getAcessData: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/acess-data', async (request, reply) => {
    const login = await prismaClient.acessData.findMany()
    return login
  })
}
