import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'
import z from 'zod'

export const updateStudents: FastifyPluginAsyncZod = async (app, opts) => {
  app.put('/students/:id', async (request, reply) => {
    // Schema de validação dos parâmetros
    const paramsSchema = z.object({
      id: z.string(), // Valida que o ID é uma string
    })

    // Schema de validação do corpo da requisição
    const bodySchema = z.object({
      registrationStatus: z.enum([
        'PENDENTE',
        'CONFIRMADO',
        'CANCELADO',
        'TRANCADO',
        'INSCRITO',
        'NAO_INSCRITO',
      ]),
    })

    try {
      // Valida os parâmetros e o corpo da requisição
      const { id } = paramsSchema.parse(request.params)
      const { registrationStatus } = bodySchema.parse(request.body)

      // Atualiza o estudante no banco de dados
      const updatedStudent = await prismaClient.registration.update({
        where: { id }, // Identifica o estudante pelo ID
        data: { registrationStatus }, // Atualiza os campos name e surname
      })

      // Retorna o estudante atualizado
      return reply.status(200).send({
        message: 'Estudante atualizado com sucesso',
        student: updatedStudent,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Erros de validação com Zod
        return reply.status(400).send({
          message: 'Erro de validação',
          errors: error.errors,
        })
      }

      // Outros erros (como erros do Prisma)
      return reply.status(500).send({
        message: 'Erro interno do servidor',
        error,
      })
    }
  })
}
