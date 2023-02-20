import { FsDonationRepository } from 'adapters/data-sources/filesystem/repositories/donation-repository'
import { FsUserRepository } from 'adapters/data-sources/filesystem/repositories/user-repository'
import { DonationController } from 'core/modules/donation/donation-controller'
import { DonationUseCaseImpl } from 'core/modules/donation/donation-usecase'
import { type Controller } from 'ports/http/controller'

export const donationFactory = (): Controller => {
  const fsUserRepository = new FsUserRepository()
  const fsDonationRepository = new FsDonationRepository()
  const donationUseCase = new DonationUseCaseImpl(fsUserRepository, fsDonationRepository)
  const donationController = new DonationController(donationUseCase)
  return donationController
}
