import { badRequest, ok } from 'core/utils/helpers'
import { type Middleware } from 'ports/http/middleware'
import { type Request } from 'ports/http/request'
import { type Response } from 'ports/http/response'
import { isNil } from 'ramda'

export class IsAuthenticatedMiddleware implements Middleware {
  async handle (request: Request): Promise<Response> {
    const { headers } = request
    if (isNil(headers)) {
      return badRequest({ message: 'Missing headers' })
    }
    const { authorization } = headers
    if (isNil(authorization)) {
      return badRequest({ message: 'Missing authorization header' })
    }
    const [type, token] = authorization.split(' ') as string[]
    if (type.toLowerCase() !== 'basic') {
      return badRequest({ message: 'Invalid authorization type' })
    }
    const [username, password] = Buffer.from(token, 'base64').toString().split(':')
    if (username !== process.env.BASIC_USERNAME) {
      return badRequest({ message: 'Invalid username' })
    }
    if (password !== process.env.BASIC_PASSWORD) {
      return badRequest({ message: 'Invalid password' })
    }
    return ok({ message: 'Authenticated' })
  }
}
