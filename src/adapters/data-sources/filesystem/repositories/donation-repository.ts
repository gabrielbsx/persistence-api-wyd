import { type Donation } from 'core/domain/entities/donation'
import { type DonationRepository } from 'core/domain/repositories/donation-repository'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { writeFileSync } from 'node:fs'

export class FsDonationRepository implements DonationRepository {
  static _importDonate = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'import-donate')
  static _importItem = join(__dirname, '..', '..', '..', '..', '..', 'mock', 'server', 'dbsrv', 'run', 'import-item')
  async send (donation: Donation): Promise<boolean> {
    const randomFileNameImportDonate = `${randomUUID()}.txt`
    writeFileSync(join(FsDonationRepository._importDonate, randomFileNameImportDonate), `${donation.username} ${donation.donate}`)
    for (const item of donation.items) {
      const randomFileNameImportItem = `${randomUUID()}.txt`
      const effects = item.effects.map(({ effect, value }) => `${effect} ${value}`).join(' ')
      writeFileSync(join(FsDonationRepository._importItem, randomFileNameImportItem), `${donation.username} ${item.index} ${effects}`)
    }
    return true
  }
}
