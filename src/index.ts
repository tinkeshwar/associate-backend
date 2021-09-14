import BluebirdPromise from 'bluebird'
import * as server from './config/server'
import dbconnector from './config/database'
import logger from './config/logger'
import Shutdown from './utilities/Shutdown'
BluebirdPromise.config({
  cancellation: true
})

const start = async () => {
  try {
    logger.info('Connecting..')
    await dbconnector.authenticate()
    await server.start()
    logger.info('Connected')
  } catch (error: any) {
    logger.error(error)
  }
}
start()

Shutdown(async () => {
  await server.stop()
  await dbconnector.close()
})
