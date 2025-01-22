import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'
import { z } from 'zod'

export const deleteAcessData: FastifyPluginAsyncZod = async (app, opts) => {
  app.delete('/delete/:id', async (request, reply) => {
    const deleteAcessDataRequest = z.object({
      id: z.string(),
    })
    const { id } = deleteAcessDataRequest.parse(request.params)
    await prismaClient.acessData.delete({
      where: {
        id,
      },
    })
    return { message: 'User deleted successfully' }
  })
}
