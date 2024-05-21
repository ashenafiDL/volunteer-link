"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./RBAC/roles.guard");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const applications_module_1 = require("./applications/applications.module");
const auth_module_1 = require("./auth/auth.module");
const certificates_module_1 = require("./certificates/certificates.module");
const email_module_1 = require("./email/email.module");
const files_module_1 = require("./files/files.module");
const locations_module_1 = require("./locations/locations.module");
const stats_module_1 = require("./misc/stats/stats.module");
const organizations_module_1 = require("./organizations/organizations.module");
const prisma_module_1 = require("./prisma/prisma.module");
const prisma_service_1 = require("./prisma/prisma.service");
const projects_module_1 = require("./projects/projects.module");
const recommendations_module_1 = require("./recommendations/recommendations.module");
const reports_module_1 = require("./reports/reports.module");
const reviews_module_1 = require("./reviews/reviews.module");
const skill_categories_module_1 = require("./skillsAndCategories/skill-categories/skill-categories.module");
const skills_module_1 = require("./skillsAndCategories/skills/skills.module");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            email_module_1.EmailModule,
            locations_module_1.LocationsModule,
            files_module_1.FilesModule,
            skills_module_1.SkillsModule,
            skill_categories_module_1.SkillCategoriesModule,
            stats_module_1.StatsModule,
            organizations_module_1.OrganizationsModule,
            projects_module_1.ProjectsModule,
            applications_module_1.ApplicationsModule,
            reviews_module_1.ReviewsModule,
            reports_module_1.ReportsModule,
            certificates_module_1.CertificatesModule,
            recommendations_module_1.RecommendationsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            users_service_1.UsersService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map