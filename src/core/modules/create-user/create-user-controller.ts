import { ok } from 'core/utils/helpers'
import { type Controller } from 'ports/http/controller'
import { type Request } from 'ports/http/request'
import { type Response } from 'ports/http/response'
import { type CreateUserResponse } from './interfaces/create-user-controller'
import { type CreateUserUseCase } from './interfaces/create-user-usecase'

export class CreateUserController implements Controller {
  constructor (private readonly createUserUseCase: CreateUserUseCase) {}
  async handle (request: Request): Promise<Response<CreateUserResponse>> {
    const userCreated = await this.createUserUseCase.execute(request.body)
    return ok(userCreated)
  }
}
