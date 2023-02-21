import { type Item } from 'core/domain/entities/item'

export interface DonationRequest {
  username: string
  donate: number
  items?: Item[]
}

export interface DonationResponse {
  isSended: boolean
}
