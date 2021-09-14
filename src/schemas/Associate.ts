import Joi from 'joi'
import { SpecializationResponseSchema } from './Specialization'

const date = new Date()

const AssociateResponse = Joi.object({
  id: Joi.number().required().example(1),
  name: Joi.string().required().example('John'),
  phone: Joi.number().required().example('9876543210'),
  address: Joi.string().optional().allow(null),
  created_at: Joi.date().optional().allow(null).example(date),
  updated_at: Joi.date().optional().allow(null).example(date),
  specializations: Joi.array().optional().items(SpecializationResponseSchema),
}).unknown().label('Associate')

const AssociateResponseList = Joi.object({
  list: Joi.array().items(AssociateResponse).required().label('List Data'),
  meta: Joi.object({
    total: Joi.number().required().example(0),
    page: Joi.number().required().example(1),
    per_page: Joi.number().required().example(1)
  }).unknown().label('List Meta')
}).unknown().label('Associate List')

export const AssociateResponseSchema = AssociateResponse
export const AssociateListResponseSchema = AssociateResponseList
