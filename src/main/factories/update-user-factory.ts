import { FsUserRepository } from 'adapters/data-sources/filesystem/repositories/user-repository'
import { UpdateUserController } from 'core/modules/update-user/update-user-controller'
import { UpdateUserUseCaseImpl } from 'core/modules/update-user/update-user-usecase'
import { type Controller } from 'ports/http/controller'

export const updateUserFactory = (): Controller => {
  const fsUserRepository = new FsUserRepository()
  const updateUserUseCase = new UpdateUserUseCaseImpl(fsUserRepository)
  const updateUserController = new UpdateUserController(updateUserUseCase)
  return updateUserController
}
