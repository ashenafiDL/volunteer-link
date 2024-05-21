"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const skill_categories_service_1 = require("./skill-categories.service");
const skill_categories_controller_1 = require("./skill-categories.controller");
let SkillCategoriesModule = class SkillCategoriesModule {
};
exports.SkillCategoriesModule = SkillCategoriesModule;
exports.SkillCategoriesModule = SkillCategoriesModule = __decorate([
    (0, common_1.Module)({
        controllers: [skill_categories_controller_1.SkillCategoriesController],
        providers: [skill_categories_service_1.SkillCategoriesService],
    })
], SkillCategoriesModule);
//# sourceMappingURL=skill-categories.module.js.map