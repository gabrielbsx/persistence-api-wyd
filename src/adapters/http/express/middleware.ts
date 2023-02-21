import { type Response, type Request } from 'express'
import { type Middleware } from 'ports/http/middleware'

export const ExpressMiddlewareAdapter = (middleware: Middleware) => {
  return (request: Request, response: Response, next: () => void) => {
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers
    }
    middleware.handle(httpRequest).then(({ statusCode, body }) => {
      if (statusCode >= 200 && statusCode <= 299) {
        Object.assign(request, body)
        next()
        return null
      }
      return response.status(statusCode).json({ error: body.message })
    }).catch((error) => {
      console.log(error)
      return response.status(500).json({ error: error.message })
    })
  }
}
