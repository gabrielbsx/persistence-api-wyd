import { type Request } from './request'
import { type Response } from './response'

export interface Middleware {
  handle: (request: Request) => Promise<Response>
}
