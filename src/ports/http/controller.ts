import { type Request } from './request'
import { type Response } from './response'

export interface Controller {
  handle: (request: Request) => Promise<Response>
}
