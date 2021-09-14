import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import * as env from './environment'
import documentor from './documentor'
import routes from './route'
import logger from './logger'
import Joi from 'joi'
// initialize configuration
env.config()
const { SERVER_PORT, SERVER_HOST } = process.env

const serverPoint = {
  host: SERVER_HOST,
  port: SERVER_PORT,
  routes: {
    cors: {
      origin: ['*'],
      credentials: true,
      headers: ['Accept', 'Content-Type', 'Authorization'],
      additionalHeaders: ['X-localization']
    },
    validate: {
      failAction: async (err:any) => {
        throw Boom.badRequest(err)
      }
    }
  }
} as any

if (process.env.NODE_ENV === 'development') {
  serverPoint.debug = { request: ['error'] }
}

export const server = new Hapi.Server(serverPoint)

let prepared = false

const prepare = async (): Promise<void> => {
  if (prepared) {
    return
  }
  await server.register(documentor as any)
  server.validator(Joi)
  server.route(routes)
  prepared = true
}

export const start = async (): Promise<Hapi.Server> => {
  await prepare()
  await server.start()
  logger.info(`Server started on port: ${SERVER_PORT}`)
  logger.info(`Explorer is available at: http://${SERVER_HOST}:${SERVER_PORT}/explorer`)
  return server
}

export const init = async (): Promise<Hapi.Server> => {
  await prepare()
  await server.initialize()
  return server
}

export const stop = async (): Promise<void> => {
  await server.stop()
}
