import { type UserRepository } from 'core/domain/repositories'
import { type DonationUseCaseResponse, type DonationUseCase, type DonationUseCaseData } from './interfaces/donation-usecase'
import { isNil } from 'ramda'
import { type DonationRepository } from 'core/domain/repositories/donation-repository'

export class DonationUseCaseImpl implements DonationUseCase {
  constructor (private readonly userRepository: UserRepository, private readonly donationRepository: DonationRepository) {}
  async execute (donationUseCaseData: DonationUseCaseData): Promise<DonationUseCaseResponse> {
    const userExists = await this.userRepository.findByUsername(donationUseCaseData.username)
    if (isNil(userExists)) {
      throw new Error('User not found')
    }
    const isDonationSended = await this.donationRepository.send(donationUseCaseData)
    return {
      isSended: isDonationSended
    }
  }
}
