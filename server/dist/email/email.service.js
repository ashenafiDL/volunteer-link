"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs-extra"));
const Handlebars = __importStar(require("handlebars"));
const path_1 = require("path");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendPasswordResetCode(recipient, code, fullName) {
        try {
            const templatePath = (0, path_1.join)(process.cwd(), 'templates', 'passwordResetRequest.hbs');
            const template = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = Handlebars.compile(template);
            const html = compiledTemplate({
                name: fullName,
                code: code,
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
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send password reset code. Please try again later.');
        }
    }
    async sendAccountCreatedConfirmation(recipient, fullName) {
        try {
            const templatePath = (0, path_1.join)(process.cwd(), 'templates', 'accountCreated.hbs');
            const template = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = Handlebars.compile(template);
            const html = compiledTemplate({
                name: fullName,
            });
            await this.mailerService.sendMail({
                to: recipient,
                subject: `Welcome to VolunteerLink`,
                html: html,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send password reset code. Please try again later.');
        }
    }
    async sendPasswordChangeConfirmation(recipient, fullName) {
        try {
            const templatePath = (0, path_1.join)(process.cwd(), 'templates', 'passwordChanged.hbs');
            const template = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = Handlebars.compile(template);
            const html = compiledTemplate({
                name: fullName,
            });
            await this.mailerService.sendMail({
                to: recipient,
                subject: `${fullName}, your password was successfully reset`,
                html: html,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send password reset code. Please try again later.');
        }
    }
    async sendEmailVerificationCode(recipient, fullName, code) {
        try {
            const templatePath = (0, path_1.join)(process.cwd(), 'templates', 'verifyYourEmail.hbs');
            const template = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = Handlebars.compile(template);
            const html = compiledTemplate({
                name: fullName,
                code: code,
            });
            await this.mailerService.sendMail({
                to: recipient,
                subject: `Your verification code - ${code}`,
                html: html,
            });
            return {
                message: 'Email with email verification code sent',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send email verification code. Please try again later.');
        }
    }
    async sendApplicationAcceptedEmail(recipient, fullName, projectTitle, organizationName, startDate, url) {
        try {
            const templatePath = (0, path_1.join)(process.cwd(), 'templates', 'applicationAccepted.hbs');
            const template = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = Handlebars.compile(template);
            const html = compiledTemplate({
                name: fullName,
                projectTitle: projectTitle,
                organizationName: organizationName,
                startDate: startDate,
                url: url,
            });
            await this.mailerService.sendMail({
                to: recipient,
                subject: `Application Accepted`,
                html: html,
            });
            return {
                message: 'Email sent',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send email. Please try again later.');
        }
    }
    async sendApplicationRejectedEmail(recipient, fullName, projectTitle, organizationName) {
        try {
            const templatePath = (0, path_1.join)(process.cwd(), 'templates', 'applicationRejected.hbs');
            const template = fs.readFileSync(templatePath, 'utf8');
            const compiledTemplate = Handlebars.compile(template);
            const html = compiledTemplate({
                name: fullName,
                projectTitle: projectTitle,
                organizationName: organizationName,
            });
            await this.mailerService.sendMail({
                to: recipient,
                subject: `Application Rejected`,
                html: html,
            });
            return {
                message: 'Email sent',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send email. Please try again later.');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map