import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LOCATIONS } from './seedData/locations';
import { SKILL_CATEGORIES } from './seedData/skillCategories';
import { SKILLS } from './seedData/skills';

const prisma = new PrismaClient();

async function main() {
  const logger = new Logger('seeder');

  // Create roles
  const adminRole = await prisma.roles.create({
    data: { name: 'Admin', description: 'Full access to all features' },
  });
  const volunteerRole = await prisma.roles.create({
    data: { name: 'Volunteer', description: 'Can contribute to projects' },
  });

  // Create sample locations
  const addisAbaba = await prisma.locations.create({
    data: { name: 'Addis Ababa', code: 'ADDABA' },
  });
  const debreBerhan = await prisma.locations.create({
    data: { name: 'Debre Berhan', code: 'DEBBER' },
  });

  // Create other locations in bulk
  const locations = await prisma.locations.createMany({
    data: LOCATIONS.map((location) => ({
      name: location.name,
      code: location.code,
    })),
    skipDuplicates: true,
  });
  logger.log(`Created ${locations.count} locations.`);

  // Create users, assigning roles and locations
  const adminPassword = 'Admin1234';
  const volunteerPassword = 'User1234';
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  const hashedVolunteerPassword = await bcrypt.hash(volunteerPassword, 10);

  const users = await prisma.users.createMany({
    data: [
      {
        firstName: 'user',
        lastName: 'admin',
        username: 'admin',
        email: 'user.admin@test.com',
        password: hashedAdminPassword,
        roleId: adminRole.id,
        locationId: addisAbaba.id,
      },
      {
        firstName: 'user',
        lastName: 'volunteer',
        username: 'volunteer',
        email: 'user.volunteer@test.com',
        password: hashedVolunteerPassword,
        roleId: volunteerRole.id,
        locationId: debreBerhan.id,
      },
    ],
  });
  logger.log(`Created ${users.count} users.`);

  // Seed skills and skill categories
  // Seed skill categories
  const skillCategories = await prisma.skillCategories.createMany({
    data: SKILL_CATEGORIES,
    skipDuplicates: true,
  });
  logger.log(`Created ${skillCategories.count} skill categories.`);

  // Seed skills
  let skills_count = 0;
  for (const skill of SKILLS) {
    await prisma.skills.create({
      data: {
        name: skill.name,
        description: skill.description,
        category: {
          connect: { name: skill.category },
        },
      },
    });

    skills_count++;
  }

  logger.log(`Created ${skills_count} skills.`);

  logger.log('Seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
