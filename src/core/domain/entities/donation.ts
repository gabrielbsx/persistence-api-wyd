import { type Item } from './item'

export interface Donation {
  username: string
  donate: number
  items?: Item[]
}
