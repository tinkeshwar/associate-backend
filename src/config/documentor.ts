'use strict'

import Vision from '@hapi/vision'
import Inert from '@hapi/inert'
import HapiSwagger from 'hapi-swagger'
import { compact } from 'lodash'
import dotenv from 'dotenv'
dotenv.config()

const {
  NODE_ENV,
  SERVER_SSL
} = process.env

export default compact([
  {
    plugin: HapiSwagger,
    options: {
      schemes: [SERVER_SSL === 'true' ? 'https' : 'http'],
      info: {
        title: process.env.npm_package_name !== undefined ? process.env.npm_package_name.toUpperCase() : 'NA',
        description: process.env.npm_package_description !== undefined ? process.env.npm_package_description : 'NA',
        version: process.env.npm_package_version !== undefined ? process.env.npm_package_version : 'NA'
      },
      expanded: 'none',
      basePath: '/api/',
      pathPrefixSize: 2,
      pathReplacements: [],
      documentationPage: NODE_ENV === 'development',
      documentationPath: '/explorer'
    }
  },
  Vision,
  Inert
])
