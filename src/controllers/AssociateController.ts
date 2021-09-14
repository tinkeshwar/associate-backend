import * as Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Associate from '../models/Associate'
import MasterController from './MasterController'
import { Specialization } from '../models'

class AssociateController extends MasterController<typeof Associate> {
  constructor () {
    super(Associate)
  }

  async store(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Error | Hapi.ResponseObject> {
    try {
      const data = await this.preStore(request)
      const associate = await Associate.create(data)
      if(data.specializations.length){
        Promise.all(data.specializations.map(async (specialization: number)=>{
          await associate.addSpecialization(specialization)
        }))
      }
      return response.response(associate)
    } catch (error: any) {
      return Boom.badImplementation(error)
    }
  }

  async update(request: Hapi.Request, response: Hapi.ResponseToolkit): Promise<Error | Hapi.ResponseObject> {
    try {
      const { data, where } = await this.preUpdate(request)
      const associate = await Associate.findOne({ where })
      if(!associate){
        return Boom.notFound('Associate not found.')
      }
      const allSpecialization = await (await Specialization.findAll({ where: {status: true }})).map(specialization=>specialization.id)
      await associate.update(data, { where })
      await associate.removeSpecializations(allSpecialization)
      if(data.specializations.length){
        Promise.all(data.specializations.map(async (specialization: number)=>{
          await associate.addSpecialization(specialization)
        }))
      }
      return response.response(associate)
    } catch (error: any) {
      return Boom.badImplementation(error)
    }
  }
}

AssociateController.options = {
  id: 'id',
  searchBy: ['id', 'name'],
  sortBy: ['created_at', 'desc'],
  createWith: ['id', 'name', 'phone', 'address', 'specializations'],
  updateWith: ['name', 'phone', 'address', 'specializations'],
  included: ['specializations']
}

export default AssociateController
