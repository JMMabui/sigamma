import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { prismaClient } from '../../../database/script'
import z from 'zod'

export const getStudents: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/students', async (request, reply) => {
    const students = await prismaClient.student.findMany()
    const totalStudents = await prismaClient.student.count()
    console.log(`total de estudentes inscritos: ${totalStudents}`)
    return students
  })
}

const paramsSchema = z.object({
  id: z.string(),
})

export const getStudentId: FastifyPluginAsyncZod = async (app, opts) => {
  app.get('/students/:id', async (request, reply) => {
    // Validar o ID do estudante
    const result = paramsSchema.safeParse(request.params)
    if (!result.success) {
      return reply.status(400).send({
        message: 'ID inválido',
        errors: result.error.errors,
      })
    }
    const { id } = result.data

    // Buscar o estudante no banco de dados
    const student = await prismaClient.student.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
      },
    })

    // Se o estudante não for encontrado, retornar erro 404
    if (!student) {
      return reply.status(404).send({ message: 'Estudante não encontrado' })
    }

    const numberStudent = student.id
    const fullName = `${student.name} ${student.surname}`

    console.log(`numero de estudante: ${numberStudent}`)
    console.log(`nome completo: ${fullName}`)

    return reply.status(200).send({ message: 'Estudante encontrado', student })
  })
}
