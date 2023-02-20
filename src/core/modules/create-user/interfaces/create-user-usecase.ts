export interface CreateUserUseCaseData {
  username: string
  password: string
}

export interface CreateUserUseCaseResponse {
  username: string
}

export interface CreateUserUseCase {
  execute: (request: CreateUserUseCaseData) => Promise<CreateUserUseCaseResponse>
}
