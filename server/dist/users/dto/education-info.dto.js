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
exports.EducationInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EducationInfoDto {
}
exports.EducationInfoDto = EducationInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Field of education' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EducationInfoDto.prototype, "field", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the institute, school, college or university',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EducationInfoDto.prototype, "institute", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Start date of education',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], EducationInfoDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of education. If empty then ongoing education',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EducationInfoDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optional description of the education',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EducationInfoDto.prototype, "description", void 0);
//# sourceMappingURL=education-info.dto.js.map