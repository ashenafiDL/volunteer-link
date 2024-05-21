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
exports.CreateSkillCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSkillCategoryDto {
}
exports.CreateSkillCategoryDto = CreateSkillCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the skill category' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSkillCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the skill category' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSkillCategoryDto.prototype, "description", void 0);
//# sourceMappingURL=create-skill-category.dto.js.map