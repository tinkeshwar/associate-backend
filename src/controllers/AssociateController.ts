import Associate from '../models/Associate'
import MasterController from './MasterController'

class AssociateController extends MasterController<typeof Associate> {
  constructor () {
    super(Associate)
  }
}

AssociateController.options = {
  id: 'id',
  searchBy: ['id', 'name'],
  sortBy: ['created_at', 'desc'],
  createWith: ['id', 'name', 'phone', 'address'],
  updateWith: ['name', 'phone', 'address'],
  included: ['specializations']
}

export default AssociateController
