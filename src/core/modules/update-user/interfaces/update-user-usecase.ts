export interface UpdateUserUseCaseData {
  username: string
  password: string
}

export interface UpdateUserUseCaseResponse {
  username: string
}

export interface UpdateUserUseCase {
  execute: (request: UpdateUserUseCaseData) => Promise<UpdateUserUseCaseResponse>
}
