import { type Item } from 'core/domain/entities/item'

export interface DonationUseCaseData {
  username: string
  donate: number
  items?: Item[]
}

export interface DonationUseCaseResponse {
  isSended: boolean
}

export interface DonationUseCase {
  execute: (request: DonationUseCaseData) => Promise<DonationUseCaseResponse>
}
