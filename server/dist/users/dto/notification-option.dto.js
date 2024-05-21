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
exports.NotificationOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NotificationOptionDto {
}
exports.NotificationOptionDto = NotificationOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            'task_assigned',
            'new_project_recommendation',
            'project_status_update',
            'deadlines',
            'application_status_update',
            'badge_and_certificate',
        ],
        description: 'Notification option type',
    }),
    (0, class_validator_1.IsEnum)({
        task_assigned: 'task_assigned',
        new_project_recommendation: 'new_project_recommendation',
        project_status_update: 'project_status_update',
        deadlines: 'deadlines',
        application_status_update: 'application_status_update',
        badge_and_certificate: 'badge_and_certificate',
    }),
    __metadata("design:type", String)
], NotificationOptionDto.prototype, "option", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notification option value. (True or False)',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificationOptionDto.prototype, "value", void 0);
//# sourceMappingURL=notification-option.dto.js.map