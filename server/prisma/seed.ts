import { faker } from '@faker-js/faker';
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
    data: { name: 'Admin', description: 'Administrator role.' },
  });
  const volunteerRole = await prisma.roles.create({
    data: { name: 'Volunteer', description: 'Regular user role.' },
  });
  logger.log('Seeded 2 roles.');

  // Seed locations
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
  logger.log(`Seeded ${locations.count} locations.`);

  // Seed users
  const adminPassword = 'Admin1234';
  const volunteerPassword = 'User1234';
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  const hashedVolunteerPassword = await bcrypt.hash(volunteerPassword, 10);

  const volunteer = await prisma.users.create({
    data: {
      firstName: 'user',
      lastName: 'volunteer',
      username: 'volunteer',
      email: 'user.volunteer@test.com',
      password: hashedVolunteerPassword,
      roleId: volunteerRole.id,
      locationId: debreBerhan.id,
      age: faker.number.int({ min: 18, max: 100 }),
      gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
      bio: faker.lorem.sentences(),
    },
  });
  const admin = await prisma.users.create({
    data: {
      firstName: 'user',
      lastName: 'admin',
      username: 'admin',
      email: 'user.admin@test.com',
      password: hashedAdminPassword,
      roleId: adminRole.id,
      locationId: addisAbaba.id,
      age: faker.number.int({ min: 18, max: 100 }),
      gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
      bio: faker.lorem.sentences(),
    },
  });
  logger.log(`Seeded 2 users.`);

  // Seed skills and skill categories
  // Seed skill categories
  const skillCategories = await prisma.skillCategories.createMany({
    data: SKILL_CATEGORIES,
    skipDuplicates: true,
  });
  logger.log(`Seeded ${skillCategories.count} skill categories.`);

  // Seed skills
  let skills_count = 0;
  for (const skill of SKILLS) {
    await prisma.skills.upsert({
      where: {
        name: skill.name,
      },
      update: {},
      create: {
        name: skill.name,
        description: skill.description,
        category: {
          connectOrCreate: {
            create: {
              name: skill.category,
              description: 'Skill category description.',
            },
            where: { name: skill.category },
          },
        },
      },
    });

    skills_count++;
  }
  logger.log(`Seeded ${skills_count} skills.`);

  // Seed badges
  const badgeData = [
    {
      name: 'Bronze',
      threshold: 5,
      description:
        'Users who have contributed to at least 5 projects will be awarded the Bronze badge.',
    },
    {
      name: 'Silver',
      threshold: 10,
      description:
        'Users who have contributed to at least 10 projects will be awarded the Silver badge.',
    },
    {
      name: 'Gold',
      threshold: 20,
      description:
        'Users who have contributed to at least 20 projects will be awarded the Gold badge.',
    },
    {
      name: 'Platinum',
      threshold: 50,
      description:
        'Users who have contributed to at least 50 projects will be awarded the Platinum badge.',
    },
    {
      name: 'Diamond',
      threshold: 100,
      description:
        'Users who have contributed to at least 100 projects will be awarded the Diamond badge.',
    },
  ];

  const badges = await prisma.badges.createMany({
    data: badgeData,
  });
  logger.log(`Seeded ${badges.count} badges.`);

  // Give sample badges to users
  await prisma.usersToBadges.create({
    data: {
      user: {
        connect: {
          id: volunteer.id,
        },
      },
      badge: {
        connect: {
          name: 'Bronze',
        },
      },
    },
  });
  await prisma.usersToBadges.create({
    data: {
      user: {
        connect: {
          id: volunteer.id,
        },
      },
      badge: {
        connect: {
          name: 'Gold',
        },
      },
    },
  });
  logger.log(`Seeded 2 badges to users.`);

  // Seed organizations
  const organization1 = await prisma.organizations.create({
    data: {
      name: 'Tech Org',
      mission: 'Innovate tech solutions',
      aboutUs: 'We are a tech organization focused on innovation',
      contactPhone: faker.phone.number(),
      location: { connect: { id: addisAbaba.id } },
      verified: true,
      owner: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          bio: faker.lorem.sentences(),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  const organization2 = await prisma.organizations.create({
    data: {
      name: 'Design Org',
      mission: 'Create beautiful designs',
      aboutUs: 'We are a design organization focused on aesthetics',
      contactPhone: faker.phone.number(),
      location: { connect: { id: debreBerhan.id } },
      verified: false,
      owner: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          bio: faker.lorem.sentences(),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  logger.log(`Seeded 2 organizations.`);

  // Seed projects
  const createProject = async (
    title: string,
    description: string,
    orgId: string,
    locationId: string,
    startDate: Date,
    endDate: Date,
    timeCommitment: 'SHORT_TERM' | 'LONG_TERM',
    status: 'IN_PROGRESS' | 'NOT_STARTED' | 'DONE',
    provideCertificate: boolean,
  ) => {
    const project = await prisma.projects.create({
      data: {
        title,
        description,
        organization: { connect: { id: orgId } },
        location: { connect: { id: locationId } },
        startDate,
        endDate,
        timeCommitment,
        status,
        provideCertificate,
      },
    });

    return project;
  };

  const project1 = await createProject(
    'Mobile App Development',
    'Develop a new mobile app',
    organization1.id,
    addisAbaba.id,
    faker.date.recent(),
    faker.date.future(),
    'LONG_TERM',
    'IN_PROGRESS',
    true,
  );
  const project2 = await createProject(
    'UI/UX Redesign',
    'Redesign the user interface',
    organization2.id,
    debreBerhan.id,
    faker.date.recent(),
    faker.date.future(),
    'SHORT_TERM',
    'NOT_STARTED',
    false,
  );
  const project3 = await createProject(
    'Database Optimization',
    'Optimize database performance',
    organization1.id,
    debreBerhan.id,
    faker.date.recent(),
    faker.date.future(),
    'LONG_TERM',
    'NOT_STARTED',
    true,
  );
  const project4 = await createProject(
    'Marketing Campaign',
    'Launch a new marketing campaign',
    organization2.id,
    debreBerhan.id,
    faker.date.recent(),
    faker.date.future(),
    'SHORT_TERM',
    'NOT_STARTED',
    false,
  );
  await createProject(
    'Cybersecurity Audit',
    'Conduct a cybersecurity audit',
    organization1.id,
    debreBerhan.id,
    faker.date.recent(),
    faker.date.future(),
    'LONG_TERM',
    'IN_PROGRESS',
    true,
  );
  await createProject(
    'Website Development',
    'Build a website for the company',
    organization1.id,
    addisAbaba.id,
    faker.date.recent(),
    faker.date.future(),
    'LONG_TERM',
    'IN_PROGRESS',
    true,
  );
  await createProject(
    'Content Creation',
    'Create engaging content for marketing purposes',
    organization1.id,
    addisAbaba.id,
    faker.date.recent(),
    faker.date.future(),
    'SHORT_TERM',
    'NOT_STARTED',
    false,
  );
  await createProject(
    'Data Analysis',
    'Analyze company data to provide insights',
    organization2.id,
    addisAbaba.id,
    faker.date.recent(),
    faker.date.future(),
    'LONG_TERM',
    'NOT_STARTED',
    true,
  );
  const project5 = await createProject(
    'Mobile Game Development',
    'Develop a new mobile game',
    organization1.id,
    addisAbaba.id,
    faker.date.recent(),
    faker.date.future(),
    'SHORT_TERM',
    'DONE',
    true,
  );
  logger.log(`Seeded 9 projects.`);

  // Seed reviews
  await prisma.reviews.create({
    data: {
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
      project: {
        connect: { id: project5.id },
      },
      user: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  await prisma.reviews.create({
    data: {
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
      project: {
        connect: { id: project5.id },
      },
      user: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  await prisma.reviews.create({
    data: {
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
      project: {
        connect: { id: project5.id },
      },
      user: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  await prisma.reviews.create({
    data: {
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
      project: {
        connect: { id: project5.id },
      },
      user: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  await prisma.reviews.create({
    data: {
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
      project: {
        connect: { id: project5.id },
      },
      user: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  await prisma.reviews.create({
    data: {
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
      project: {
        connect: { id: project5.id },
      },
      user: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  await prisma.reviews.create({
    data: {
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(),
      project: {
        connect: { id: project5.id },
      },
      user: {
        create: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          roleId: volunteerRole.id,
          age: faker.number.int({ min: 18, max: 100 }),
          gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
          skills: {
            connect: [
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
              {
                name: faker.helpers.arrayElement(SKILLS).name,
              },
            ],
          },
        },
      },
    },
  });
  logger.log('Seeded 7 reviews.');

  // Seed certificates
  await prisma.certificates.create({
    data: {
      dateGiven: new Date(),
      projectId: project5.id,
      userId: volunteer.id,
    },
  });
  logger.log('Seeded 1 certificate.');

  // Seed applications
  const applications = await prisma.applications.createMany({
    data: [
      {
        message: faker.lorem.sentences(),
        projectId: project5.id,
        userId: volunteer.id,
        status: 'ACCEPTED',
      },
      {
        message: faker.lorem.sentences(),
        projectId: project4.id,
        userId: volunteer.id,
        status: faker.helpers.arrayElement(['PENDING', 'ACCEPTED', 'REJECTED']),
      },
      {
        message: faker.lorem.sentences(),
        projectId: project3.id,
        userId: volunteer.id,
        status: faker.helpers.arrayElement(['PENDING', 'ACCEPTED', 'REJECTED']),
      },
      {
        message: faker.lorem.sentences(),
        projectId: project2.id,
        userId: volunteer.id,
        status: faker.helpers.arrayElement(['PENDING', 'ACCEPTED', 'REJECTED']),
      },
      {
        message: faker.lorem.sentences(),
        projectId: project1.id,
        userId: volunteer.id,
        status: faker.helpers.arrayElement(['PENDING', 'ACCEPTED', 'REJECTED']),
      },
    ],
  });
  logger.log(`Seeded ${applications.count} applications.`);

  // Seed reports
  const reports = await prisma.reports.createMany({
    data: [
      {
        contentId: project5.id,
        contentType: 'PROJECT',
        reason: faker.helpers.arrayElement([
          'FAKE',
          'SCAM',
          'INAPPROPRIATE_CONTENT',
          'SPAM',
          'IMPERSONATION',
          'PRIVACY_VIOLATION',
          'OTHER',
        ]),
        reporterId: volunteer.id,
        status: faker.helpers.arrayElement(['ACTIVE', 'RESOLVED']),
        description: faker.lorem.sentences(),
      },
      {
        contentId: admin.id,
        contentType: 'USER',
        reason: faker.helpers.arrayElement([
          'FAKE',
          'SCAM',
          'INAPPROPRIATE_CONTENT',
          'SPAM',
          'IMPERSONATION',
          'PRIVACY_VIOLATION',
          'OTHER',
        ]),
        reporterId: volunteer.id,
        status: faker.helpers.arrayElement(['ACTIVE', 'RESOLVED']),
        description: faker.lorem.sentences(),
      },
      {
        contentId: organization2.id,
        contentType: 'ORGANIZATION',
        reason: faker.helpers.arrayElement([
          'FAKE',
          'SCAM',
          'INAPPROPRIATE_CONTENT',
          'SPAM',
          'IMPERSONATION',
          'PRIVACY_VIOLATION',
          'OTHER',
        ]),
        reporterId: volunteer.id,
        status: faker.helpers.arrayElement(['ACTIVE', 'RESOLVED']),
        description: faker.lorem.sentences(),
      },
      {
        contentId: organization1.id,
        contentType: 'ORGANIZATION',
        reason: faker.helpers.arrayElement([
          'FAKE',
          'SCAM',
          'INAPPROPRIATE_CONTENT',
          'SPAM',
          'IMPERSONATION',
          'PRIVACY_VIOLATION',
          'OTHER',
        ]),
        reporterId: volunteer.id,
        status: faker.helpers.arrayElement(['ACTIVE', 'RESOLVED']),
        description: faker.lorem.sentences(),
      },
    ],
  });
  logger.log(`Seeded ${reports.count} reports.`);

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
