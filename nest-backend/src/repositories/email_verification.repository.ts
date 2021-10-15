import { EntityRepository, Repository } from 'typeorm'
import EmailVerification from '../entities/email_verification'

@EntityRepository(EmailVerification)
export class EmailVerificationRepository extends Repository<EmailVerification> {

}
