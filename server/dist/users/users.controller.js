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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../RBAC/role.enum");
const roles_decorator_1 = require("../RBAC/roles.decorator");
const create_admin_dto_1 = require("../auth/dto/create-admin.dto");
const users_controllers_doc_1 = require("./docs/users-controllers.doc");
const education_info_dto_1 = require("./dto/education-info.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_service_1 = require("./users.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getMe(req) {
        const id = req.user.sub;
        const user = await this.userService.findOne(id);
        return this.userService.sanitizeUserData(user);
    }
    async getUserByUsername(username) {
        const user = await this.userService.findOne(username);
        if (!user.isActive) {
            throw new common_1.NotFoundException('User with the specified username was not found.');
        }
        return this.userService.sanitizeUserData(user);
    }
    update(req, updateUserDto) {
        const id = req.user.sub;
        return this.userService.updateUser(id, updateUserDto);
    }
    updateEducation(req, educationId, updateEducationInfoDto) {
        const userId = req.user.sub;
        return this.userService.updateEducation(userId, educationId, updateEducationInfoDto);
    }
    removeEducation(req, educationId) {
        const userId = req.user.sub;
        return this.userService.deleteEducation(userId, educationId);
    }
    deactivateAccount(req) {
        const id = req.user.sub;
        return this.userService.deactivateAccount(id);
    }
    delete(req) {
        const id = req.user.sub;
        return this.userService.deleteUser(id);
    }
    removeSkill(req, skillId) {
        const userId = req.user.sub;
        return this.userService.removeSkill(userId, skillId);
    }
    getContributions(userId) {
        return this.userService.fetchContributions(userId);
    }
    getAll() {
        return this.userService.findAll();
    }
    updateUserById(id, updateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }
    registerAdmin(createAdminDto) {
        return this.userService.createAdmin(createAdminDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('me'),
    (0, users_controllers_doc_1.ApiGetMeEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(':username'),
    (0, users_controllers_doc_1.ApiGetUserByUsernameEndpoint)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByUsername", null);
__decorate([
    (0, common_1.Patch)('me/update'),
    (0, users_controllers_doc_1.ApiUpdateProfileEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Patch)('me/education/update/:educationId'),
    (0, users_controllers_doc_1.ApiUpdateEducationEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('educationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, education_info_dto_1.EducationInfoDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateEducation", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Delete)('me/education/remove/:educationId'),
    (0, users_controllers_doc_1.ApiDeleteEducationEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('educationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeEducation", null);
__decorate([
    (0, common_1.Patch)('deactivateAccount'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deactivateAccount", null);
__decorate([
    (0, common_1.Delete)('me/delete'),
    (0, users_controllers_doc_1.ApiDeleteAccountEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "delete", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Patch)('me/skills/remove/:skillId'),
    (0, users_controllers_doc_1.ApiRemoveSkillEndpoint)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('skillId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeSkill", null);
__decorate([
    (0, common_1.Get)(':userId/contributions'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getContributions", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserById", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)('register-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "registerAdmin", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserController);
//# sourceMappingURL=users.controller.js.map