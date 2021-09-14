import HealthController from '../controllers/HealthController'

const controller = new HealthController()

export default [
  {
    path: '/',
    method: 'GET',
    handler: controller.check.bind(controller)
  }
]
