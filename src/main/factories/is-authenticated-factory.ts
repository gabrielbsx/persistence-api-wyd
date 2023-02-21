import { IsAuthenticatedMiddleware } from 'core/modules/is-authenticated/is-authenticated-middleware'
import { type Middleware } from 'ports/http/middleware'

export const isAuthenticatedFactory = (): Middleware => {
  const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware()
  return isAuthenticatedMiddleware
}
