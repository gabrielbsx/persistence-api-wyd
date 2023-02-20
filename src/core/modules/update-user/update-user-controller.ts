import { ok } from 'core/utils/helpers'
import { type Controller } from 'ports/http/controller'
import { type Request } from 'ports/http/request'
import { type Response } from 'ports/http/response'
import { type UpdateUserResponse } from './interfaces/update-user-controller'
import { type UpdateUserUseCase } from './interfaces/update-user-usecase'

export class UpdateUserController implements Controller {
  constructor (private readonly updateUserUseCase: UpdateUserUseCase) {}
  async handle (request: Request): Promise<Response<UpdateUserResponse>> {
    const userUpdated = await this.updateUserUseCase.execute(request.body)
    return ok(userUpdated)
  }
}
