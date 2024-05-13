# VolunteerLink

VolunteerLink is an online platform designed to connect volunteers with organizations efficiently. It aims to bridge the gap between eager volunteers and organizations in need of their skills, fostering collaboration on community-driven initiatives and supporting innovative ideas for community improvement.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)

## Features

VolunteerLink includes the following key features:

- **User Authentication:** Secure mechanisms for login, password reset, and email verification.
- **Profile Management:** Comprehensive profiles for volunteers and organizations, detailing skills, interests, and past experiences.
- **Badge, Certificate, and Contribution History:** Tracking and recognition of user contributions with badges and certificates.
- **Project Posting and Management:** Detailed project profiles and browsing capabilities for users to apply based on skills and interests.
- **Monetary Donations:** Support for monetary contributions to listed projects.
- **Communication and Collaboration:** Real-time messaging, file sharing, and updates within project spaces.
- **Project Tracking and Management:** Tools for progress tracking, task allocation, scheduling, and status updates.
- **Administrative Controls:** Backend access for user management, content moderation, and system configuration.
- **Feedback and Reporting:** User reviews for projects, reporting fake/scam content, and notifications.
- **Recommendation System:** Personalized recommendations based on skills, location, and interests.

## Getting Started

To get started with VolunteerLink, follow the installation steps outlined below.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ashenafiDL/volunteer-link.git
   ```

2. **Install dependencies: both client and server**

   ```bash
   cd client
   npm install

   cd server
   npm install
   ```

3. **Set up environmental variables according to `.env.example` files both inside `client` and `server` folders**

4. **Apply database migrations in server folder**

   ```bash
   cd server
   npx prisma migrate dev
   ```

5. **Add initial seed data:**

   ```bash
   npx prisma migrate reset # This will remove the existing data from the database
   ```

   ```bash
   npx prisma db seed # Use this as alternative
   ```

6. **Start the server:**

   ```bash
   cd server
   npm run start:dev # For development server
   npm run start:prod # For production server

   cd client
   npm run dev # For development build
   npm run build # For production build
   ```

## Usage

Once the server is running, access the VolunteerLink platform through your web browser.
