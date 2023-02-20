import { type Donation } from '../entities/donation'

export interface DonationRepository {
  send: (donation: Donation) => Promise<boolean>
}
