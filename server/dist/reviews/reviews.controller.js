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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../RBAC/role.enum");
const roles_decorator_1 = require("../RBAC/roles.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const create_review_dto_1 = require("./dto/create-review.dto");
const reviews_service_1 = require("./reviews.service");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    addReviewToProject(req, projectId, createReviewDto) {
        const userId = req.user.sub;
        return this.reviewsService.addReviewToProject(createReviewDto, userId, projectId);
    }
    getAllReviewByProjectId(projectId) {
        return this.reviewsService.getReviewsByProjectId(projectId);
    }
    checkReviewed(projectId, req) {
        const userId = req.user.sub;
        return this.reviewsService.checkReviewed(userId, projectId);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Post)(':projectId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('projectId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "addReviewToProject", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "getAllReviewByProjectId", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Volunteer),
    (0, common_1.Get)('check/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "checkReviewed", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map