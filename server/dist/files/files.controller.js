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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const fs = __importStar(require("fs-extra"));
const multer_1 = require("multer");
const certificates_service_1 = require("../certificates/certificates.service");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const files_controllers_docs_1 = require("./docs/files-controllers.docs");
const update_profile_pic_dto_1 = require("./dto/update-profile-pic.dto");
const files_service_1 = require("./files.service");
let FilesController = class FilesController {
    constructor(filesService, certificatesService) {
        this.filesService = filesService;
        this.certificatesService = certificatesService;
    }
    uploadFile(updateProfilePicDto, file) {
        return this.filesService.changeProfileImage(updateProfilePicDto.email, file);
    }
    async serveProfilePicture(email, res) {
        try {
            const filepath = await this.filesService.findProfilePicturePath(email);
            res.sendFile(`${process.cwd()}/${filepath}`);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while fetching profile picture. Please try again.');
        }
    }
    deleteAvatar(req) {
        const id = req.user['sub'];
        return this.filesService.deleteProfilePicture(id);
    }
    uploadLogo(id, file) {
        return this.filesService.changeLogo(id, file);
    }
    async serveLogo(id, res) {
        try {
            const filepath = await this.filesService.findLogoPath(id);
            res.sendFile(`${process.cwd()}/${filepath}`);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while fetching logo. Please try again.');
        }
    }
    deleteLogo(id) {
        return this.filesService.deleteLogo(id);
    }
    uploadPermit(id, file) {
        return this.filesService.uploadPermit(id, file);
    }
    async servePermit(id, res) {
        try {
            const filepath = await this.filesService.findPermitPath(id);
            res.sendFile(`${process.cwd()}/${filepath}`);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while fetching permit. Please try again.');
        }
    }
    uploadCV(id, file) {
        return this.filesService.uploadCV(id, file);
    }
    async serveCV(id, res) {
        try {
            const filepath = await this.filesService.findCVPath(id);
            res.sendFile(`${process.cwd()}/${filepath}`);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while fetching CV. Please try again.');
        }
    }
    async serveCertificate(id, res) {
        try {
            const certificate = await this.certificatesService.findOne(id);
            if (!certificate) {
                throw new common_1.NotFoundException('Certificate not found');
            }
            let orgLogoPath;
            try {
                orgLogoPath = await this.filesService.findLogoPath(certificate.project.organization.id);
            }
            catch (error) {
                orgLogoPath = './assets/logos/logo.png';
            }
            const fullName = `${certificate.user.firstName} ${certificate.user.lastName}`;
            const filepath = await this.filesService.generateCertificate(orgLogoPath, './assets/logos/logo.png', fullName, certificate.project.title, certificate.project.organization.name, certificate.project.startDate.toDateString(), certificate.project.endDate.toDateString());
            const fullPath = `${process.cwd()}/${filepath.slice(2)}`;
            if (fs.existsSync(fullPath)) {
                res.sendFile(fullPath);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error while fetching certificate. Please try again.');
        }
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, files_controllers_docs_1.ApiProfilePicUpdateEndpoint)(),
    (0, common_1.Post)('profilePic/update'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/profile-pictures',
            filename: (req, file, callback) => {
                callback(null, `${req.user['sub']}_${new Date().toISOString()}.${file.originalname
                    .split('.')
                    .pop()}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'jpeg|jpg|png',
    })
        .addMaxSizeValidator({
        maxSize: 2000000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_profile_pic_dto_1.UpdateProfilePicDto, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, files_controllers_docs_1.ApiGetProfilePictureEndpoint)(),
    (0, common_1.Get)('getProfilePicture/:email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "serveProfilePicture", null);
__decorate([
    (0, common_1.Delete)('deleteProfilePicture'),
    (0, files_controllers_docs_1.ApiDeleteProfilePictureEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "deleteAvatar", null);
__decorate([
    (0, common_1.Post)('logo/update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/logos',
            filename: (req, file, callback) => {
                callback(null, `$${new Date().toISOString()}.${file.originalname
                    .split('.')
                    .pop()}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'jpeg|jpg|png',
    })
        .addMaxSizeValidator({
        maxSize: 2000000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadLogo", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('getLogo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "serveLogo", null);
__decorate([
    (0, common_1.Delete)('deleteLogo/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "deleteLogo", null);
__decorate([
    (0, common_1.Post)('uploadPermit/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('permit', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/permits',
            filename: (req, file, callback) => {
                callback(null, `$${new Date().toISOString()}.${file.originalname
                    .split('.')
                    .pop()}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'pdf',
    })
        .addMaxSizeValidator({
        maxSize: 10000000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadPermit", null);
__decorate([
    (0, common_1.Get)('getPermit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "servePermit", null);
__decorate([
    (0, common_1.Post)('uploadCV/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cv', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/CVs',
            filename: (req, file, callback) => {
                callback(null, `$${new Date().toISOString()}.${file.originalname
                    .split('.')
                    .pop()}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'pdf',
    })
        .addMaxSizeValidator({
        maxSize: 10000000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadCV", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('getCV/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "serveCV", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('certificates/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "serveCertificate", null);
exports.FilesController = FilesController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        certificates_service_1.CertificatesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map