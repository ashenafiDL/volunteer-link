"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CertificatesService = class CertificatesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(userId) {
        try {
            const certificates = this.prisma.certificates.findMany({
                where: {
                    userId,
                },
                include: {
                    project: {
                        include: {
                            organization: true,
                        },
                    },
                },
            });
            return certificates;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to load certificates');
        }
    }
    findOne(id) {
        try {
            const certificate = this.prisma.certificates.findUnique({
                where: { id },
                include: {
                    user: true,
                    project: {
                        include: {
                            organization: true,
                        },
                    },
                },
            });
            if (certificate) {
                return certificate;
            }
            else {
                throw new common_1.NotFoundException('Certificate not found');
            }
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to locate certificate');
            }
        }
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map