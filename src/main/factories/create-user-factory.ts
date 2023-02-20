import { FsUserRepository } from 'adapters/data-sources/filesystem/repositories/user-repository'
import { CreateUserController } from 'core/modules/create-user/create-user-controller'
import { CreateUserUseCaseImpl } from 'core/modules/create-user/create-user-usecase'
import { type Controller } from 'ports/http/controller'

export const createUserFactory = (): Controller => {
  const fsUserRepository = new FsUserRepository()
  const createUserUseCase = new CreateUserUseCaseImpl(fsUserRepository)
  const createUserController = new CreateUserController(createUserUseCase)
  return createUserController
}
