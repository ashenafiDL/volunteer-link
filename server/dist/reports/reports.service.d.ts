import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(reporterId: string, createReportDto: CreateReportDto): Promise<NotFoundException | {
        id: string;
        reporterId: string;
        contentType: import(".prisma/client").$Enums.ReportContentTypes;
        contentId: string;
        reason: import(".prisma/client").$Enums.ReportReasons;
        description: string;
        status: import(".prisma/client").$Enums.ReportStatus;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        reporter: {
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        reporterId: string;
        contentType: import(".prisma/client").$Enums.ReportContentTypes;
        contentId: string;
        reason: import(".prisma/client").$Enums.ReportReasons;
        description: string;
        status: import(".prisma/client").$Enums.ReportStatus;
        createdAt: Date;
    })[]>;
    resolveAReport(id: string): Promise<{
        message: string;
    }>;
}
