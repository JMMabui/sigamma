import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import type { FastifyTypeInstance } from '../../type'
import { createStudentSubject } from '../../function/registration/student_subject'
import { findStudentById } from '../../function/students/create-students'
import { findSubjectByCodigo } from '../../function/registration/disciplines/create-disciplines'
import { prismaClient } from '../../database/script'

export const Student_Subject: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/students_subjects',
    {
      schema: {
        tags: ['students_subjects'],
        description: 'Create relationship between student and subject',
        body: z.object({
          student_id: z.string(),
          disciplineId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { student_id, disciplineId } = request.body

        // Verificar se o student_id existe
        const studentExists = await findStudentById(student_id)
        if (!studentExists) {
          return reply.status(404).send({
            message: 'Student not found',
          })
        }

        // Verificar se o disciplineId existe
        const disciplineExists = await findSubjectByCodigo(disciplineId)
        if (!disciplineExists) {
          return reply.status(404).send({
            message: 'Discipline not found',
          })
        }

        await createStudentSubject({
          student_id,
          disciplineId,
        })
        reply.code(201).send({
          message: 'Relation created successfully',
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Retorna detalhes de erro de validação
          return reply.status(400).send({
            message: 'Validation error',
            details: error.errors,
          })
        }

        // Caso de erro genérico, como falha no banco
        console.error('Database or other server error: ', error)
        reply.code(500).send({
          message: 'Internal server error, please try again later.',
        })
      }
    }
  )

  app.get(
    '/students_subjects',
    {
      schema: {
        tags: ['students_subjects'],
        description: 'List all students and subjects',
      },
    },
    async (request, reply) => {
      const student_subject = await prismaClient.studentDiscipline.findMany()
      return { student_subject }
    }
  )
}
