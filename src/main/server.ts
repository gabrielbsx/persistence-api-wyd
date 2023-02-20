import { ExpressControllerAdapter } from 'adapters/http/express'
import express, { type Application } from 'express'
import { createUserFactory } from './factories/create-user-factory'
import { donationFactory } from './factories/donation-factory'
import { updateUserFactory } from './factories/update-user-factory'

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
  }

  routes (): void {
    Server.serverInstance.post('/create-user', ExpressControllerAdapter(createUserFactory()))
    Server.serverInstance.put('/update-user', ExpressControllerAdapter(updateUserFactory()))
    Server.serverInstance.post('/donation', ExpressControllerAdapter(donationFactory()))
  }

  bootstrap (): void {
    this.middlewares()
    this.routes()
    this.start()
  }

  start (): void {
    Server.serverInstance.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  }
}

const server = new Server()
server.bootstrap()
