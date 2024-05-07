import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { CertificatesModule } from './certificates/certificates.module';
import { EmailModule } from './email/email.module';
import { FilesModule } from './files/files.module';
import { LocationsModule } from './locations/locations.module';
import { StatsModule } from './misc/stats/stats.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectsModule } from './projects/projects.module';
import { ReportsModule } from './reports/reports.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SkillCategoriesModule } from './skillsAndCategories/skill-categories/skill-categories.module';
import { SkillsModule } from './skillsAndCategories/skills/skills.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    EmailModule,
    LocationsModule,
    FilesModule,
    SkillsModule,
    SkillCategoriesModule,
    StatsModule,
    OrganizationsModule,
    ProjectsModule,
    ApplicationsModule,
    ReviewsModule,
    ReportsModule,
    CertificatesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule {}
