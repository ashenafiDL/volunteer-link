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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const education_info_dto_1 = require("./education-info.dto");
const notification_option_dto_1 = require("./notification-option.dto");
const social_link_dto_1 = require("./social-link.dto");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'First name of the user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last name of the user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Username of the user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bio text of the user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID of the user's location" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Location preference of the user',
        enum: client_1.LocationPreference,
    }),
    (0, class_validator_1.IsEnum)(client_1.LocationPreference),
    __metadata("design:type", String)
], UserDto.prototype, "locationPreference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time preference of the user',
        enum: client_1.TimePreference,
    }),
    (0, class_validator_1.IsEnum)(client_1.TimePreference),
    __metadata("design:type", String)
], UserDto.prototype, "timePreference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "6 digit code sent to the user's email to reset password",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "resetCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "6 digit code sent to the user's email to verify email",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "verificationCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A list of key value pairs containing the users social links',
        type: [social_link_dto_1.SocialLinkDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => social_link_dto_1.SocialLinkDto),
    __metadata("design:type", Array)
], UserDto.prototype, "socialLinks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'An object containing the users notification preference',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => notification_option_dto_1.NotificationOptionDto),
    __metadata("design:type", Array)
], UserDto.prototype, "notificationPreference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gender of the user' }),
    (0, class_validator_1.IsEnum)(client_1.Gender),
    __metadata("design:type", String)
], UserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Age of the user' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(18, { message: 'The user must be at least 18 years old' }),
    __metadata("design:type", Number)
], UserDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IDs of the users skills' }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UserDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A list of key value pairs containing the users education information',
        type: [education_info_dto_1.EducationInfoDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => education_info_dto_1.EducationInfoDto),
    __metadata("design:type", Array)
], UserDto.prototype, "education", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isActive", void 0);
//# sourceMappingURL=user.dto.js.map