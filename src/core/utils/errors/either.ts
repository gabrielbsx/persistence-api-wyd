export type Either<L, R> = Left<L, R> | Right<L, R>

export class Left<L, R> {
  value: L | R

  constructor (value: L) {
    this.value = value
  }

  isLeft (): boolean {
    return true
  }

  isRight (): boolean {
    return false
  }
}

export class Right<L, R> {
  value: R | L

  constructor (value: R) {
    this.value = value
  }

  isLeft (): boolean {
    return false
  }

  isRight (): boolean {
    return true
  }
}

export const left = <L, R>(value: L): Either<L, R> => new Left(value)
export const right = <L, R>(value: R): Either<L, R> => new Right(value)
