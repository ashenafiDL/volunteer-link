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
exports.SkillCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../RBAC/role.enum");
const roles_decorator_1 = require("../../RBAC/roles.decorator");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
const skill_categories_controllers_doc_1 = require("./docs/skill-categories-controllers.doc");
const create_skill_category_dto_1 = require("./dto/create-skill-category.dto");
const update_skill_category_dto_1 = require("./dto/update-skill-category.dto");
const skill_categories_service_1 = require("./skill-categories.service");
let SkillCategoriesController = class SkillCategoriesController {
    constructor(skillCategoriesService) {
        this.skillCategoriesService = skillCategoriesService;
    }
    create(createSkillCategoryDto) {
        return this.skillCategoriesService.create(createSkillCategoryDto);
    }
    findAll() {
        return this.skillCategoriesService.findAll();
    }
    findOneById(id) {
        return this.skillCategoriesService.findOneById(id);
    }
    findOneByName(name) {
        return this.skillCategoriesService.findOneByName(name);
    }
    update(id, updateSkillCategoryDto) {
        return this.skillCategoriesService.update(id, updateSkillCategoryDto);
    }
    remove(id) {
        return this.skillCategoriesService.remove(id);
    }
};
exports.SkillCategoriesController = SkillCategoriesController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Post)(),
    (0, skill_categories_controllers_doc_1.ApiCreateSkillCategoryEndpoint)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_skill_category_dto_1.CreateSkillCategoryDto]),
    __metadata("design:returntype", void 0)
], SkillCategoriesController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, skill_categories_controllers_doc_1.ApiFindAllSkillCategoriesEndpoint)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SkillCategoriesController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, skill_categories_controllers_doc_1.ApiFindSkillCategoryByIdEndpoint)(),
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SkillCategoriesController.prototype, "findOneById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, skill_categories_controllers_doc_1.ApiFindSkillCategoryByNameEndpoint)(),
    (0, common_1.Get)('name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SkillCategoriesController.prototype, "findOneByName", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Patch)(':id'),
    (0, skill_categories_controllers_doc_1.ApiUpdateSkillCategoryEndpoint)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_skill_category_dto_1.UpdateSkillCategoryDto]),
    __metadata("design:returntype", void 0)
], SkillCategoriesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    (0, skill_categories_controllers_doc_1.ApiRemoveSkillCategoryEndpoint)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SkillCategoriesController.prototype, "remove", null);
exports.SkillCategoriesController = SkillCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Skill Categories'),
    (0, common_1.Controller)('skill-categories'),
    __metadata("design:paramtypes", [skill_categories_service_1.SkillCategoriesService])
], SkillCategoriesController);
//# sourceMappingURL=skill-categories.controller.js.map