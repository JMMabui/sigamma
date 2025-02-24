import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import {
  createDiscipline,
  createSubjects,
  findSubjectByCodigo,
} from '../../function/registration/disciplines/create-disciplines'
import type { FastifyTypeInstance } from '../../type'
import { prismaClient } from '../../database/script'

export const createDisciplines: FastifyPluginAsyncZod = async (
  app: FastifyTypeInstance,
  opts
) => {
  app.post(
    '/disciplines',
    {
      schema: {
        tags: ['disciplines'],
        description: 'create disciplines',
        body: z.object({
          codigo: z.string(),
          disciplineName: z.string(),
          year_study: z.enum([
            'PRIMEIRO_ANO',
            'SEGUNDO_ANO',
            'TERCEIRO_ANO',
            'QUARTO_ANO',
          ]),
          semester: z.enum(['PRIMEIRO_SEMESTRE', 'SEGUNDO_SEMESTRE']),
          hcs: z.number(),
          credits: z.number(),
          disciplineType: z.enum(['COMPLEMENTAR', 'NUCLEAR']),
        }),
      },
    },
    async (request, reply) => {
      try {
        const {
          codigo,
          credits,
          disciplineName,
          disciplineType,
          hcs,
          semester,
          year_study,
        } = request.body
        const subject = await createDiscipline({
          codigo,
          credits,
          disciplineName,
          disciplineType,
          hcs,
          semester,
          year_study,
        })

        return reply
          .code(201)
          .send({ message: 'Discipline created successfully', subject })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação',
            errors: error.errors,
          })
        }
        reply.code(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.post(
    '/subjects',
    {
      schema: {
        tags: ['Subjects'],
        description:
          'create subjects with relationsheep between subject and course ',
        body: z.object({
          codigo: z.string(),
          disciplineName: z.string(),
          year_study: z.enum([
            'PRIMEIRO_ANO',
            'SEGUNDO_ANO',
            'TERCEIRO_ANO',
            'QUARTO_ANO',
          ]),
          semester: z.enum(['PRIMEIRO_SEMESTRE', 'SEGUNDO_SEMESTRE']),
          hcs: z.number(),
          credits: z.number(),
          disciplineType: z.enum(['COMPLEMENTAR', 'NUCLEAR']),
          courseId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      console.log('api iniciado', request.body)
      const {
        codigo,
        credits,
        disciplineName,
        disciplineType,
        hcs,
        semester,
        year_study,
        courseId,
      } = request.body

      try {
        const subject = await createSubjects({
          codigo,
          credits,
          disciplineName,
          disciplineType,
          hcs,
          semester,
          year_study,
          courseId,
        })

        return reply
          .code(201)
          .send({ message: 'Discipline created successfully' })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            message: 'Erro de validação',
            errors: error.errors,
          })
        }
        reply.code(500).send({ message: 'Internal server error' })
      }
    }
  )

  app.get(
    '/discipline',
    {
      schema: {
        tags: ['disciplines'],
        description: 'list all disciplines',
      },
    },
    async (request, reply) => {
      const discipline = await prismaClient.discipline.findMany()
      return { discipline }
    }
  )

  app.get(
    '/subjects/:id',
    {
      schema: {
        tags: ['Subjects'],
        description: 'search if subject exist or not using code',
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string }
      const subject = await findSubjectByCodigo(id.toUpperCase()) // Função fictícia para buscar a disciplina pelo código
      if (subject) {
        return reply.send({ exists: true }) // Código já existe
      }
      return reply.send({ exists: false }) // Código não existe
    }
  )
}
