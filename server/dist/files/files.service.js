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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs-extra"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const prisma_service_1 = require("../prisma/prisma.service");
let FilesService = class FilesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async changeProfileImage(email, file) {
        try {
            const existingUser = await this.prisma.users.findUnique({
                where: { email },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException();
            }
            if (existingUser.profilePictureId) {
                const existingFile = await this.prisma.files.delete({
                    where: { id: existingUser.profilePictureId },
                });
                try {
                    await fs.remove(`${existingFile.filePath}`);
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException();
                }
            }
            const newFile = await this.prisma.files.create({
                data: {
                    filename: file.filename,
                    filePath: `./uploads/profile-pictures/${file.filename}`,
                    fileType: file.mimetype,
                    size: file.size,
                },
            });
            await this.prisma.users.update({
                where: { email },
                data: {
                    profilePictureId: newFile.id,
                },
            });
            return { massage: 'User profile picture updated successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('User with specified email does not exist');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update user profile image. Please try again later.');
            }
        }
    }
    async findProfilePicturePath(email) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { email, profilePicture: { isNot: null }, isActive: true },
            });
            if (!user) {
                throw new common_1.NotFoundException();
            }
            const file = await this.prisma.files.findUnique({
                where: { id: user.profilePictureId },
            });
            return file.filePath;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('User with specified email cannot be found');
            }
            else {
                throw new common_1.InternalServerErrorException('Error while fetching profile picture. Please try again');
            }
        }
    }
    async deleteProfilePicture(id) {
        const user = await this.prisma.users.findUnique({
            where: { id, profilePicture: { isNot: null } },
        });
        if (!user) {
            throw new common_1.NotFoundException('A user with the specified ID cannot be found');
        }
        const file = await this.prisma.files.delete({
            where: { id: user.profilePictureId },
        });
        try {
            await fs.remove(file.filePath);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to delete the file from the file system');
        }
        try {
            await this.prisma.users.update({
                where: { id },
                data: {
                    profilePictureId: null,
                },
            });
            return { message: 'Profile picture deleted successful' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while deleting profile picture. Please try again');
        }
    }
    async changeLogo(id, file) {
        try {
            const org = await this.prisma.organizations.findUnique({
                where: { id },
            });
            if (!org) {
                throw new common_1.NotFoundException("Organization with specified ID doesn't exist");
            }
            if (org.logoId) {
                const existingFile = await this.prisma.files.delete({
                    where: { id: org.logoId },
                });
                try {
                    await fs.remove(`${existingFile.filePath}`);
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException();
                }
            }
            const newFile = await this.prisma.files.create({
                data: {
                    filename: file.filename,
                    filePath: `./uploads/logos/${file.filename}`,
                    fileType: file.mimetype,
                    size: file.size,
                },
            });
            await this.prisma.organizations.update({
                where: { id },
                data: {
                    logoId: newFile.id,
                },
            });
            return { massage: 'Logo updated successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update logo. Please try again later.');
            }
        }
    }
    async findLogoPath(id) {
        try {
            const org = await this.prisma.organizations.findUnique({
                where: {
                    id,
                    logo: {
                        isNot: null,
                    },
                },
            });
            if (!org) {
                throw new common_1.NotFoundException();
            }
            const file = await this.prisma.files.findUnique({
                where: { id: org.logoId },
            });
            return file.filePath;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Organization with specified ID cannot be found');
            }
            else {
                throw new common_1.InternalServerErrorException('Error while fetching profile picture. Please try again');
            }
        }
    }
    async deleteLogo(id) {
        const org = await this.prisma.organizations.findFirst({
            where: {
                AND: [{ id: id }, { logoId: { not: null } }],
            },
        });
        if (!org) {
            throw new common_1.NotFoundException('An organization with the specified ID cannot be found');
        }
        const file = await this.prisma.files.delete({
            where: { id: org.logoId },
        });
        try {
            await fs.remove(file.filePath);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to delete the file from the file system');
        }
        try {
            await this.prisma.organizations.update({
                where: { id },
                data: {
                    logoId: null,
                },
            });
            return { message: 'Logo deleted successful' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while deleting logo. Please try again');
        }
    }
    async uploadPermit(id, file) {
        try {
            const org = await this.prisma.organizations.findUnique({
                where: { id },
            });
            if (!org) {
                throw new common_1.NotFoundException("Organization with specified ID doesn't exist");
            }
            if (org.permitId) {
                const existingFile = await this.prisma.files.delete({
                    where: { id: org.permitId },
                });
                try {
                    await fs.remove(`${existingFile.filePath}`);
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException();
                }
            }
            const newFile = await this.prisma.files.create({
                data: {
                    filename: file.filename,
                    filePath: `./uploads/permits/${file.filename}`,
                    fileType: file.mimetype,
                    size: file.size,
                },
            });
            await this.prisma.organizations.update({
                where: { id },
                data: {
                    permitId: newFile.id,
                },
            });
            return { massage: 'Permit updated successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to upload permit. Please try again later.');
            }
        }
    }
    async findPermitPath(id) {
        try {
            const org = await this.prisma.organizations.findUnique({
                where: {
                    id,
                    permit: {
                        isNot: null,
                    },
                },
            });
            if (!org) {
                throw new common_1.NotFoundException();
            }
            const file = await this.prisma.files.findUnique({
                where: { id: org.permitId },
            });
            return file.filePath;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Organization with specified ID cannot be found');
            }
            else {
                throw new common_1.InternalServerErrorException('Error while fetching profile picture. Please try again');
            }
        }
    }
    async uploadCV(id, file) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.NotFoundException("User with specified ID doesn't exist");
            }
            if (user.cvId) {
                const existingFile = await this.prisma.files.delete({
                    where: { id: user.cvId },
                });
                try {
                    await fs.remove(`${existingFile.filePath}`);
                }
                catch (error) {
                    throw new common_1.InternalServerErrorException('Failed to delete CV');
                }
            }
            const newFile = await this.prisma.files.create({
                data: {
                    filename: file.filename,
                    filePath: `./uploads/CVs/${file.filename}`,
                    fileType: file.mimetype,
                    size: file.size,
                },
            });
            await this.prisma.users.update({
                where: { id },
                data: {
                    cvId: newFile.id,
                },
            });
            return { massage: 'CV uploaded successfully' };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to upload permit. Please try again later.');
            }
        }
    }
    async findCVPath(id) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id,
                    cv: {
                        isNot: null,
                    },
                    isActive: true,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException("User with specified ID doesn't exist");
            }
            const file = await this.prisma.files.findUnique({
                where: { id: user.cvId },
            });
            return file.filePath;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException('Error while fetching CV. Please try again');
            }
        }
    }
    generateCertificate(orgLogoPath, vlLogoPath, fullName, projectTitle, organizationName, startDate, endDate) {
        return new Promise((resolve, reject) => {
            try {
                const certificatePath = './uploads/certificate.pdf';
                const outerDistanceMargin = 10;
                const middleDistanceMargin = outerDistanceMargin + 8;
                const filleAndStrokeColor = '#444';
                const lineWidthLarge = 5;
                const lineWidthSmall = 1;
                const lineJoinType = 'bevel';
                const logoMaxWidth = 140;
                const logoMaxHeight = 50;
                const fontOnePath = './assets/fonts/Montserrat-VariableFont_wght.ttf';
                const fontTwoPath = './assets/fonts/Kalam-Regular.ttf';
                const doc = new pdfkit_1.default({ size: 'A4', layout: 'landscape' });
                const writeStream = fs.createWriteStream(certificatePath);
                doc.pipe(writeStream);
                doc
                    .fillAndStroke(filleAndStrokeColor)
                    .lineWidth(lineWidthLarge)
                    .lineJoin(lineJoinType)
                    .rect(outerDistanceMargin, outerDistanceMargin, doc.page.width - outerDistanceMargin * 2, doc.page.height - outerDistanceMargin * 2)
                    .stroke();
                doc
                    .fillAndStroke(filleAndStrokeColor)
                    .lineWidth(lineWidthSmall)
                    .lineJoin(lineJoinType)
                    .rect(middleDistanceMargin, middleDistanceMargin, doc.page.width - middleDistanceMargin * 2, doc.page.height - middleDistanceMargin * 2)
                    .stroke();
                const x = doc.page.width / 2 - logoMaxWidth / 2;
                const y = 60;
                doc.image(orgLogoPath, x - 300, y, {
                    fit: [logoMaxWidth, logoMaxHeight],
                    align: 'center',
                });
                doc.image(vlLogoPath, x + 300, y, {
                    fit: [logoMaxWidth, logoMaxHeight],
                    align: 'center',
                });
                this.jumpLine(doc, 3);
                doc
                    .font(fontTwoPath)
                    .fontSize(28)
                    .text('Certificate of Participation', { align: 'center' });
                this.jumpLine(doc, 1);
                doc
                    .font(fontTwoPath)
                    .fontSize(12)
                    .text(`This certificate is awarded to`, { align: 'center' });
                this.jumpLine(doc, 2);
                doc
                    .font(fontOnePath)
                    .fontSize(24)
                    .text(fullName, { align: 'center', underline: true });
                this.jumpLine(doc, 1);
                doc
                    .font(fontTwoPath)
                    .fontSize(12)
                    .text(`for participation in the project:`, { align: 'center' });
                this.jumpLine(doc, 2);
                doc
                    .font(fontOnePath)
                    .fontSize(24)
                    .text(projectTitle, { align: 'center', underline: true });
                this.jumpLine(doc, 2);
                doc
                    .font(fontTwoPath)
                    .fontSize(10)
                    .text(`This certificate is awarded to recognize ${fullName}'s generous volunteering efforts in the project ${projectTitle} organized by ${organizationName}. The project spanned from ${startDate} to ${endDate}.`, { align: 'center' });
                doc.end();
                writeStream.on('finish', () => {
                    resolve(certificatePath);
                });
                writeStream.on('error', (error) => {
                    reject(error);
                });
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Error while generating certificate. Please try again');
            }
        });
    }
    jumpLine(doc, lines) {
        for (let index = 0; index < lines; index++) {
            doc.moveDown();
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FilesService);
//# sourceMappingURL=files.service.js.map