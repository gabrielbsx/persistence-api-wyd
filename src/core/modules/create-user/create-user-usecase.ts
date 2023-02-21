import { type UserRepository } from 'core/domain/repositories'
import { type CreateUserUseCaseData, type CreateUserUseCase, type CreateUserUseCaseResponse } from './interfaces/create-user-usecase'
import { isNil, not } from 'ramda'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}
  async execute (createUserUseCaseData: CreateUserUseCaseData): Promise<CreateUserUseCaseResponse> {
    const userExists = await this.userRepository.findByUsername(createUserUseCaseData.username)
    if (not(isNil(userExists))) {
      throw new Error('User already exists')
    }
    const { username, password } = createUserUseCaseData
    const user = await this.userRepository.create({ username, password })
    if (!user) {
      throw new Error('User not created')
    }
    return {
      username
    }
  }
}
