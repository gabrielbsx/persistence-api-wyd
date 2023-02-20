import { writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { type User } from '../../../../core/domain/entities'
import { type UserRepository } from '../../../../core/domain/repositories'
import * as R from 'ramda'
import { randomUUID } from 'node:crypto'

export class FsUserRepository implements UserRepository {
  static _subDirectoriesAccount = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).concat(['etc'])
  static _userDatabasePath = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'accounts')
  static _importUser = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'import-user')
  static _importPassword = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'import-password')

  async create (user: Pick<User, 'username' | 'password'>): Promise<boolean> {
    const randomFileName = `${randomUUID()}.txt`
    writeFileSync(join(FsUserRepository._importUser, randomFileName), `${user.username} ${user.password}`)
    return true
  }

  async update (user: Pick<User, 'username' | 'password'>): Promise<boolean> {
    const randomFileName = `${randomUUID()}.txt`
    writeFileSync(join(FsUserRepository._importPassword, randomFileName), `${user.username} ${user.password}`)
    return true
  }

  async findByUsername (username: User['username']): Promise<User | null> {
    const subDirectoryByUsername = (username[0].match(/[a-z]/i) !== null) ? username[0] : 'etc'
    const directoryUser = join(FsUserRepository._userDatabasePath, subDirectoryByUsername, username)
    const user = R.pipe(
      R.tryCatch(
        (directoryUser) => existsSync(directoryUser),
        () => false
      )
    )(directoryUser)
    if (!user) {
      return null
    }
    return {
      username,
      password: '',
      numericPassword: ''
    }
  }
}
