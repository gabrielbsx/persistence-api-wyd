import { type UserRepository } from 'core/domain/repositories'
import { type UpdateUserUseCaseData, type UpdateUserUseCase, type UpdateUserUseCaseResponse } from './interfaces/update-user-usecase'
import { isNil, not } from 'ramda'

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}
  async execute (updateUserUseCaseData: UpdateUserUseCaseData): Promise<UpdateUserUseCaseResponse> {
    const userExists = await this.userRepository.findByUsername(updateUserUseCaseData.username)
    if (isNil(userExists)) {
      throw new Error('User not found')
    }
    const { username, password } = updateUserUseCaseData
    const isUserUpdated = await this.userRepository.update({ username, password })
    if (not(isUserUpdated)) {
      throw new Error('User not updated')
    }
    return {
      isUpdated: isUserUpdated
    }
  }
}
