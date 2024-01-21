import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as Handlebars from 'handlebars';
import { join } from 'path';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordResetCode(
    recipient: string,
    code: string,
    fullName: string,
  ) {
    const templatePath = join(process.cwd(), 'templates', 'passwordReset.hbs');
    const template = fs.readFileSync(templatePath, 'utf8');

    const compiledTemplate = Handlebars.compile(template);
    const html = compiledTemplate({
      name: fullName,
      // TODO - update the URL to match the frontend
      URL: `${process.env.BASE_URL}/auth/reset-password?token=${code}`,
    });

    await this.mailerService.sendMail({
      to: recipient,
      subject: `Your reset code - ${code}`,
      html: html,
    });

    return {
      message: 'Email with reset code sent',
    };
  }
}
