import {
  ExpressControllerAdapter,
  ExpressMiddlewareAdapter
} from 'adapters/http/express'
import express, { type Application } from 'express'
import { createUserFactory } from './factories/create-user-factory'
import { donationFactory } from './factories/donation-factory'
import { isAuthenticatedFactory } from './factories/is-authenticated-factory'
import { updateUserFactory } from './factories/update-user-factory'
import { config as configDotEnv } from 'dotenv'

class Server {
  static serverInstance: Application
  constructor () {
    if (Server.serverInstance === undefined) {
      Server.serverInstance = express()
    }
  }

  middlewares (): void {
    Server.serverInstance.use(express.json())
    Server.serverInstance.use(express.urlencoded({ extended: true }))
    Server.serverInstance.use(
      ExpressMiddlewareAdapter(isAuthenticatedFactory())
    )
  }

  routes (): void {
    Server.serverInstance.post(
      '/users',
      ExpressControllerAdapter(createUserFactory())
    )
    Server.serverInstance.put(
      '/users',
      ExpressControllerAdapter(updateUserFactory())
    )
    Server.serverInstance.post(
      '/donate',
      ExpressControllerAdapter(donationFactory())
    )
  }

  bootstrap (): void {
    configDotEnv()
    this.middlewares()
    this.routes()
  }

  start (): void {
    Server.serverInstance.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  }
}

const server = new Server()
server.bootstrap()
server.start()
