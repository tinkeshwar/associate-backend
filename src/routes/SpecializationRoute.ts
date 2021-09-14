import Joi from 'joi'
import SpecializationController from '../controllers/SpecializationController'
import { BadRequestErrorSchema, InternalServerErrorSchema } from '../schemas/Common'
import { SpecializationDropdownListResponseSchema } from '../schemas/Specialization'

const controller = new SpecializationController()

export default [
  {
    path: '/api/specialization/dropdown',
    method: 'GET',
    handler: controller.dropdown.bind(controller),
    options: {
      description: 'Dropdown List',
      notes: 'Get specialization dropdown list',
      tags: ['api', 'Specialization'],
      validate: {
        options: { abortEarly: false },
        query: {
          sort: Joi.string().default('created_at'),
          order: Joi.string().default('ASC'),
        }
      },
      response: {
        status: {
          200: SpecializationDropdownListResponseSchema,
          400: BadRequestErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  }
]
