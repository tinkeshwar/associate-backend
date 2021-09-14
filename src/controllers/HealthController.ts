import * as Hapi from '@hapi/hapi'

class HealthController {
  async check (_request: Hapi.Request, response: Hapi.ResponseToolkit) {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    }
    return response.response(healthcheck)
  }
}
export default HealthController
