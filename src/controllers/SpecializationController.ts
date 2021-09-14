import Specialization from '../models/Specialization'
import MasterController from './MasterController'

class SpecializationController extends MasterController<typeof Specialization> {
  constructor () {
    super(Specialization)
  }
}

SpecializationController.options = {
  id: 'id',
  searchBy: ['id'],
  sortBy: ['created_at', 'desc'],
  createWith: ['id', 'name'],
  updateWith: ['name'],
  included: []
}

export default SpecializationController
