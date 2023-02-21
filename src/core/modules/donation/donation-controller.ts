import { ok } from 'core/utils/helpers'
import { type Controller } from 'ports/http/controller'
import { type Request } from 'ports/http/request'
import { type Response } from 'ports/http/response'
import { type DonationResponse } from './interfaces/donation-controller'
import { type DonationUseCase } from './interfaces/donation-usecase'

export class DonationController implements Controller {
  constructor (private readonly donationUseCase: DonationUseCase) {}
  async handle (request: Request): Promise<Response<DonationResponse>> {
    const isDonationSended = await this.donationUseCase.execute(request.body)
    return ok(isDonationSended)
  }
}
