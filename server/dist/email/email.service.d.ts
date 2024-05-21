import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendPasswordResetCode(recipient: string, code: string, fullName: string): Promise<{
        message: string;
    }>;
    sendAccountCreatedConfirmation(recipient: string, fullName: string): Promise<void>;
    sendPasswordChangeConfirmation(recipient: string, fullName: string): Promise<void>;
    sendEmailVerificationCode(recipient: string, fullName: string, code: string): Promise<{
        message: string;
    }>;
    sendApplicationAcceptedEmail(recipient: string, fullName: string, projectTitle: string, organizationName: string, startDate: string, url: string): Promise<{
        message: string;
    }>;
    sendApplicationRejectedEmail(recipient: string, fullName: string, projectTitle: string, organizationName: string): Promise<{
        message: string;
    }>;
}
