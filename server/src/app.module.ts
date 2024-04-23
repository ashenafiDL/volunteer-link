import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { FilesModule } from './files/files.module';
import { LocationsModule } from './locations/locations.module';
import { StatsModule } from './misc/stats/stats.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProjectsModule } from './projects/projects.module';
import { SkillCategoriesModule } from './skillsAndCategories/skill-categories/skill-categories.module';
import { SkillsModule } from './skillsAndCategories/skills/skills.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule {}
