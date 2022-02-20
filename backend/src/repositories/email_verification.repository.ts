import { EntityRepository, Repository } from 'typeorm'
import { EmailVerification } from '../entities/email_verification.entity'

@EntityRepository(EmailVerification)
export class EmailVerificationRepository extends Repository<EmailVerification> {

}
