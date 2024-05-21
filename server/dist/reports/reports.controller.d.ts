import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(req: any, createReportDto: CreateReportDto): Promise<import("@nestjs/common").NotFoundException | {
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
    resolveReport(id: string, req: any): void;
}
