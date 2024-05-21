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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../RBAC/role.enum");
const roles_decorator_1 = require("../RBAC/roles.decorator");
const applications_service_1 = require("./applications.service");
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    checkApplication(req, projectId) {
        const userId = req.user.sub;
        return this.applicationsService.checkApplication(userId, projectId);
    }
    getMyApplications(req) {
        const userId = req.user.sub;
        return this.applicationsService.getMyApplications(userId);
    }
    getApplicationsByProjectId(projectId) {
        return this.applicationsService.getApplicationsByProjectId(projectId);
    }
    acceptApplication(applicationId) {
        return this.applicationsService.acceptApplication(applicationId);
    }
    rejectApplication(applicationId) {
        return this.applicationsService.rejectApplication(applicationId);
    }
};
exports.ApplicationsController = ApplicationsController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Get)('check/:projectId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "checkApplication", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Get)('myApplications'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.Get)(':projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getApplicationsByProjectId", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Get)('accept/:applicationId'),
    __param(0, (0, common_1.Param)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "acceptApplication", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Get)('reject/:applicationId'),
    __param(0, (0, common_1.Param)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "rejectApplication", null);
exports.ApplicationsController = ApplicationsController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
//# sourceMappingURL=applications.controller.js.map