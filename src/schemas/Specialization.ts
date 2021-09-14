import Joi from 'joi'

const date = new Date()

const SpecializationResponse = Joi.object({
  id: Joi.number().required().example(1),
  name: Joi.string().required().example('models.method'),
  created_at: Joi.date().optional().allow(null).example(date),
  updated_at: Joi.date().optional().allow(null).example(date)
}).unknown().label('Specialization')

const SpecializationResponseList = Joi.object({
  list: Joi.array().items(SpecializationResponse).required().label('List Data'),
  meta: Joi.object({
    total: Joi.number().required().example(0),
    page: Joi.number().required().example(1),
    per_page: Joi.number().required().example(1)
  }).unknown().label('List Meta')
}).unknown().label('Specialization List')

const SpecializationDropdownResponseList = Joi.object({
  items: Joi.array().items(SpecializationResponse).required().label('List Dropdown')
}).unknown().label('Specialization Dropdown')

export const SpecializationListResponseSchema = SpecializationResponseList
export const SpecializationResponseSchema = SpecializationResponse
export const SpecializationDropdownListResponseSchema = SpecializationDropdownResponseList
