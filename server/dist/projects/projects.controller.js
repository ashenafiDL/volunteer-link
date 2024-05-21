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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../RBAC/role.enum");
const roles_decorator_1 = require("../RBAC/roles.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const add_skill_to_project_dto_1 = require("./dto/add-skill-to-project.dto");
const apply_dto_1 = require("./dto/apply.dto");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
const projects_service_1 = require("./projects.service");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    create(createProjectDto) {
        return this.projectsService.create(createProjectDto);
    }
    getLatestProjects(days) {
        if (days === undefined) {
            days = 7;
        }
        return this.projectsService.getLatestProjects(days);
    }
    getInProgressProjects(organizationId) {
        return this.projectsService.getInProgressProjects(organizationId);
    }
    getFinishedProjects(organizationId) {
        return this.projectsService.getFinishedProjects(organizationId);
    }
    getFilteredProjects(queryParams) {
        return this.projectsService.getFilteredProjects(queryParams);
    }
    getProjectById(id) {
        return this.projectsService.findOneById(id);
    }
    apply(req, projectId, applyToProjectDto) {
        const userId = req.user.sub;
        return this.projectsService.apply(projectId, userId, applyToProjectDto.message);
    }
    update(projectId, updateProjectDto) {
        return this.projectsService.update(projectId, updateProjectDto);
    }
    addSkills(projectId, addSkillToProject) {
        return this.projectsService.addSkillsToProject(projectId, addSkillToProject);
    }
    removeSkill(projectId, skillId) {
        return this.projectsService.removeSkill(projectId, skillId);
    }
    getParticipants(projectId) {
        return this.projectsService.fetchProjectParticipants(projectId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('latest/:days?'),
    __param(0, (0, common_1.Param)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getLatestProjects", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('in-progress/:organizationId'),
    __param(0, (0, common_1.Param)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getInProgressProjects", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('finished/:organizationId'),
    __param(0, (0, common_1.Param)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getFinishedProjects", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getFilteredProjects", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getProjectById", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Post)(':projectId/apply'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, apply_dto_1.ApplyToProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "apply", null);
__decorate([
    (0, common_1.Patch)(':projectId/edit'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Post)(':projectId/skills'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_skill_to_project_dto_1.AddSkillToProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addSkills", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Delete)(':projectId/skills/:skillId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('skillId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "removeSkill", null);
__decorate([
    (0, common_1.Get)(':projectId/participants'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getParticipants", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map