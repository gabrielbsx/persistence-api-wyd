import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { type User } from '../../../../core/domain/entities'
import { type UserRepository } from '../../../../core/domain/repositories'
import * as R from 'ramda'
import { randomUUID } from 'node:crypto'

export class FsUserRepository implements UserRepository {
  static _subDirectoriesAccount = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)).concat(['etc'])
  static _userDatabasePath = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'account')
  static _importUser = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'import-user')
  static _importPassword = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'import-password')
  static _baseAccount = join(__dirname, '..', '..', '..', '..', '..', 'base')
  static _isBaseAccountUsed = true

  async create (user: Pick<User, 'username' | 'password'>): Promise<boolean> {
    if (R.not(FsUserRepository._isBaseAccountUsed)) {
      const randomFileName = `${randomUUID()}.txt`
      writeFileSync(join(FsUserRepository._importUser, randomFileName), `${user.username} ${user.password}`)
      return true
    }
    const baseBuffer = readFileSync(FsUserRepository._baseAccount)
    baseBuffer.write(user.username, 0, 16)
    baseBuffer.write(user.password, 16, 32)
    const subDirectoryByUsername = (user.username[0].match(/[a-z]/i) !== null) ? user.username[0] : 'etc'
    const directoryUser = join(FsUserRepository._userDatabasePath, subDirectoryByUsername, user.username)
    writeFileSync(directoryUser, baseBuffer)
    return true
  }

  async update (user: Pick<User, 'username' | 'password'>): Promise<boolean> {
    if (R.not(FsUserRepository._isBaseAccountUsed)) {
      const randomFileName = `${randomUUID()}.txt`
      writeFileSync(join(FsUserRepository._importPassword, randomFileName), `${user.username} ${user.password}`)
      return true
    }
    const subDirectoryByUsername = (user.username[0].match(/[a-z]/i) !== null) ? user.username[0] : 'etc'
    const accountPath = join(FsUserRepository._userDatabasePath, subDirectoryByUsername, user.username)
    const accountBuffer = readFileSync(accountPath)
    accountBuffer.write(user.password, 16, user.password.length)
    accountBuffer.writeUInt8(0x00, 16 + user.password.length)
    writeFileSync(accountPath, accountBuffer)
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
