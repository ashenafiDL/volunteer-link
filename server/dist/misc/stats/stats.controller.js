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
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
const stats_controllers_doc_1 = require("./docs/stats-controllers.doc");
const stats_service_1 = require("./stats.service");
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    getUserInfo() {
        return this.statsService.getSummary();
    }
    getAgeAndGenderCount() {
        return this.statsService.getAgeAndGenderCount();
    }
    getProjectStat() {
        return this.statsService.projectStat();
    }
    verifiedAndNotVerified() {
        return this.statsService.verifiedAndNotVerified();
    }
    reportStat() {
        return this.statsService.reportStats();
    }
    getPopularSkills() {
        return this.statsService.getPopularSkills();
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, stats_controllers_doc_1.ApiGetSummaryEndpoint)(),
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)('age-and-gender'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getAgeAndGenderCount", null);
__decorate([
    (0, common_1.Get)('projectStat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getProjectStat", null);
__decorate([
    (0, common_1.Get)('verifiedAndNotVerified'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "verifiedAndNotVerified", null);
__decorate([
    (0, common_1.Get)('reportStat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "reportStat", null);
__decorate([
    (0, common_1.Get)('popularSkills'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getPopularSkills", null);
exports.StatsController = StatsController = __decorate([
    (0, swagger_1.ApiTags)('Stats'),
    (0, common_1.Controller)('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map