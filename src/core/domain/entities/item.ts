export interface Effect {
  effect: number
  value: number
}

export interface Item {
  index: number
  effects: Effect[]
}
