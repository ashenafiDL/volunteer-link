"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const email_service_1 = require("./email.service");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: async () => {
                    const clientId = process.env.CLIENT_ID;
                    const clientSecret = process.env.CLIENT_SECRET;
                    const refreshToken = process.env.REFRESH_TOKEN;
                    const senderEmail = process.env.SENDER_EMAIL;
                    return {
                        transport: {
                            service: 'gmail',
                            auth: {
                                type: 'OAuth2',
                                user: senderEmail,
                                clientId: clientId,
                                clientSecret: clientSecret,
                                refreshToken: refreshToken,
                                accessToken: process.env.ACCESS_TOKEN,
                            },
                        },
                        defaults: {
                            from: `"No Reply" ${process.env.SENDER_EMAIL}`,
                        },
                        template: {
                            dir: (0, path_1.join)(process.cwd(), 'templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    };
                },
            }),
        ],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map