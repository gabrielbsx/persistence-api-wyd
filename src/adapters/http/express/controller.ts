import { type Response, type Request } from 'express'
import { type Controller } from 'ports/http/controller'

export const ExpressControllerAdapter = (controller: Controller) => {
  return (request: Request, response: Response) => {
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers
    }
    controller.handle(httpRequest).then(({ statusCode, body }) => {
      return response.status(statusCode).json(body)
    }).catch((error) => {
      return response.status(500).json({ error: error.message })
    })
  }
}
