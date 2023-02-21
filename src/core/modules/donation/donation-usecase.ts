import { type UserRepository } from 'core/domain/repositories'
import { type DonationUseCaseResponse, type DonationUseCase, type DonationUseCaseData } from './interfaces/donation-usecase'
import { isNil, not, pipe, tryCatch } from 'ramda'
import { type DonationRepository } from 'core/domain/repositories/donation-repository'

export class DonationUseCaseImpl implements DonationUseCase {
  constructor (private readonly userRepository: UserRepository, private readonly donationRepository: DonationRepository) {}
  async execute (donationUseCaseData: DonationUseCaseData): Promise<DonationUseCaseResponse> {
    const userExists = await this.userRepository.findByUsername(donationUseCaseData.username)
    if (isNil(userExists)) {
      throw new Error('User not found')
    }
    if (isNil(donationUseCaseData.username)) {
      throw new Error('Username is required')
    }
    if (isNil(donationUseCaseData.donate)) {
      throw new Error('Donate is required')
    }
    const items = pipe(
      tryCatch(
        (items) => {
          if (typeof items === 'string') {
            return JSON.parse(items)
          }
          return items
        },
        () => ''
      )
    )(donationUseCaseData.items)
    if (not(isNil(items)) && not(Array.isArray(items))) {
      throw new Error('Items must be an array')
    }
    const isDonationSended = await this.donationRepository.send({ ...donationUseCaseData, items })
    return {
      isSended: isDonationSended
    }
  }
}
