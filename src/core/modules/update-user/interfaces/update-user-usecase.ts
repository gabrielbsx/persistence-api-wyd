export interface UpdateUserUseCaseData {
  username: string
  password: string
}

export interface UpdateUserUseCaseResponse {
  isUpdated: boolean
}

export interface UpdateUserUseCase {
  execute: (request: UpdateUserUseCaseData) => Promise<UpdateUserUseCaseResponse>
}
