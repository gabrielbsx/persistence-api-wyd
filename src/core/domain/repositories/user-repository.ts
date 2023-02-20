import { type User } from '../entities'

export interface UserRepository {
  create: (user: Pick<User, 'username' | 'password'>) => Promise<boolean>
  update: (user: Pick<User, 'username' | 'password'>) => Promise<boolean>
  findByUsername: (username: User['username']) => Promise<User | null>
}
