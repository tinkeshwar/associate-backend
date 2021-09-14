import Joi from 'joi'
import { AssociateListResponseSchema, AssociateResponseSchema } from '../schemas/Associate'
import AssociateController from '../controllers/AssociateController'
import { BadRequestErrorSchema, InternalServerErrorSchema } from '../schemas/Common'

const controller = new AssociateController()

export default [
  {
    path: '/api/associate',
    method: 'GET',
    handler: controller.list.bind(controller),
    options: {
      description: 'Associate list',
      notes: 'Return a list of all associates',
      tags: ['api', 'Associates'],
      validate: {
        options: { abortEarly: false },
        query: {
          page: Joi.number().min(1).default(1),
          records: Joi.number().min(1).default(10),
          sort: Joi.string().optional(),
          order: Joi.string().optional(),
          name: Joi.string().optional().example('John')
        }
      },
      response: {
        status: {
          200: AssociateListResponseSchema,
          400: BadRequestErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/associate',
    method: 'POST',
    handler: controller.store.bind(controller),
    options: {
      description: 'Create Associate',
      notes: 'Create new associate in system',
      tags: ['api', 'Associates'],
      validate: {
        options: { abortEarly: false },
        payload: {
          name: Joi.string().required().example('John'),
          phone: Joi.number().required().example('9876543210'),
          address: Joi.string().optional().allow(null).empty(''),
          specializations: Joi.array().single().required().example(['1'])
        }
      },
      response: {
        status: {
          // 200: AssociateResponseSchema,
          400: BadRequestErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/associate/{id}',
    method: 'GET',
    handler: controller.show.bind(controller),
    options: {
      description: 'Get A Associate',
      notes: 'Get a associate details',
      tags: ['api', 'Associates'],
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().description('provide associate id')
        }
      },
      response: {
        status: {
          200: AssociateResponseSchema,
          400: BadRequestErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/associate/{id}',
    method: 'PUT',
    handler: controller.update.bind(controller),
    options: {
      description: 'Update A Associate',
      notes: 'Update a associate details',
      tags: ['api', 'Associates'],
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().description('provide associate id')
        },
        payload: {
          name: Joi.string().required().example('John'),
          phone: Joi.number().required().example('9876543210'),
          address: Joi.string().optional().allow(null).empty(''),
          specializations: Joi.array().single().required().example(['1'])
        }
      },
      response: {
        status: {
          200: AssociateResponseSchema,
          400: BadRequestErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  },
  {
    path: '/api/associate/{id}',
    method: 'DELETE',
    handler: controller.destroy.bind(controller),
    options: {
      description: 'Delete A Associate',
      notes: 'Delete a associate from system',
      tags: ['api', 'Associates'],
      validate: {
        options: { abortEarly: false },
        params: {
          id: Joi.number().required().description('provide associate id')
        }
      },
      response: {
        status: {
          200: AssociateResponseSchema,
          400: BadRequestErrorSchema,
          500: InternalServerErrorSchema
        }
      }
    }
  }
]
