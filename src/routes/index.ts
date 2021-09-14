import { flatten } from 'lodash'
import Health from './HealthRoute'
import Specialization from './SpecializationRoute'
import Associate from './AssociateRoute'

export default flatten([
    Health as any,
    Specialization as any,
    Associate as any
])