import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  createRegistration,
  createRegistrationWithConfirmationStatus,
} from '../../function/registration/create-registration'
import { prismaClient } from '../../../database/script'
import type { FastifyTypeInstance } from '../../type'
import {
  findCourseById,
  updateCourseVacancies,
} from '../../function/course/create-course'

export const createRegistrations: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/registration',
    {
      schema: {
        tags: ['registration'],
        description:
          'create relation between student and course, and see status if it is subscribed or not',
        body: z.object({
          course_id: z.string(),
          student_id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { course_id, student_id } = request.body

        // 1. Verificar se o curso ainda tem vagas disponíveis
        const course = await findCourseById(course_id)

        if (!course) {
          return reply.status(404).send({ message: 'Curso não encontrado' })
        }

        if (
          course.availableVacancies === null ||
          course.availableVacancies <= 0
        ) {
          return reply.status(400).send({ message: 'Não há vagas disponíveis' })
        }

        // 2. Criar o registro de inscrição entre aluno e curso
        const registration = await createRegistration({
          course_id,
          student_id,
        })

        // 3. Atualizar o número de vagas disponíveis no curso
        await updateCourseVacancies(course_id)

        reply.code(201).send({
          message: 'Inscrição criada com sucesso',
          registration,
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação',
            errors: error.errors,
          })
        }
        reply.code(500).send({ message: 'Erro interno do servidor' })
      }
    }
  )

  app.post(
    '/registration-status-confirmation',
    {
      schema: {
        tags: ['registration'],
        description:
          'create relation between student and course, and status by default is confirmado',
        body: z.object({
          course_id: z.string(),
          student_id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { course_id, student_id } = request.body

        // 1. Verificar se o curso ainda tem vagas disponíveis
        const course = await findCourseById(course_id)

        if (!course) {
          return reply.status(404).send({ message: 'Curso não encontrado' })
        }

        if (
          course.availableVacancies === null ||
          course.availableVacancies <= 0
        ) {
          return reply.status(400).send({ message: 'Não há vagas disponíveis' })
        }

        // 2. Criar o registro de inscrição entre aluno e curso
        const registration = await createRegistrationWithConfirmationStatus({
          course_id,
          student_id,
          registrationStatus: 'CONFIRMADO',
        })

        // 3. Atualizar o número de vagas disponíveis no curso
        await updateCourseVacancies(course_id)

        reply.code(201).send({
          message: 'Inscrição criada com sucesso',
          registration,
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação',
            errors: error.errors,
          })
        }
        reply.code(500).send({ message: 'Erro interno do servidor' })
      }
    }
  )

  app.put(
    '/registration-status/:id',
    {
      schema: {
        tags: ['registration'],
        description: 'Update registration status after validating registration',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          registrationStatus: z.enum([
            'PENDENTE',
            'CONFIRMADO',
            'CANCELADO',
            'TRANCADO',
            'INSCRITO',
            'NAO_INSCRITO',
          ]),
        }),
      },
    },
    async (request, reply) => {
      console.log('Entrou na rota de atualização de status de registro')

      try {
        const { id } = request.params // Pega o ID da URL
        const { registrationStatus } = request.body // Pega o status do corpo da requisição

        // Verificar se o registro existe
        const registration = await prismaClient.registration.findMany({
          where: { student_id: id },
        })

        if (!registration) {
          return reply.status(404).send({ message: 'Registro não encontrado' })
        }

        // Verificar se o ID do registro corresponde ao student_id (comparing `id` with `student_id`)
        if (registration.length === 0 || registration[0].student_id !== id) {
          return reply
            .status(400)
            .send({ message: 'ID do estudante não corresponde ao registro' })
        }

        // Atualizar o status de registro para 'CONFIRMADO'
        const updatedRegistrations = await prismaClient.registration.updateMany(
          {
            where: { student_id: id }, // Atualiza todos os registros com o mesmo student_id
            data: { registrationStatus }, // Atualiza o status para 'CONFIRMADO'
          }
        )

        if (updatedRegistrations.count === 0) {
          return reply
            .status(400)
            .send({ message: 'Erro ao atualizar o status dos registros' })
        }

        return reply.code(200).send({
          message: 'Status de registro atualizado para CONFIRMADO com sucesso',
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação',
            errors: error.errors,
          })
        }

        return reply.status(500).send({ message: 'Erro interno no servidor' })
      }
    }
  )
}
