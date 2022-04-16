import { EntityRepository, Repository } from 'typeorm'
import { Verification } from '../entities/verification.entity'

@EntityRepository(Verification)
export class VerificationRepository extends Repository<Verification> {
  public async saveVerification(verification: Verification): Promise<Verification> {
    return await this.save(verification)
  }
}
