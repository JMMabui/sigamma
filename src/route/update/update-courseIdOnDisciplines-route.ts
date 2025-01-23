import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { prismaClient } from '../../../database/script'

export const updateCourseIdOnDisciplines: FastifyPluginAsyncZod = async (
  app,
  opts
) => {
  app.put('/disciplines/:id', async (request, reply) => {
    // Schema de validação dos parâmetros
    const paramsSchema = z.object({
      id: z.string(), // Valida que o ID é uma string
    })

    // Schema de validação do corpo da requisição
    const bodySchema = z.object({
      courseId: z.string(), // Valida que o courseId é uma string
    })

    try {
      // Valida os parâmetros e o corpo da requisição
      const { id } = paramsSchema.parse(request.params)
      const { courseId } = bodySchema.parse(request.body)

      // Atualiza a disciplina no banco de dados
      const updatedDiscipline = await prismaClient.discipline.update({
        where: { codigo: id }, // Identifica a disciplina pelo ID
        data: { courseId }, // Atualiza o campo courseId
      })

      // Retorna a disciplina atualizada
      return reply.status(200).send({
        message: 'Disciplina atualizada com sucesso',
        discipline: updatedDiscipline,
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
