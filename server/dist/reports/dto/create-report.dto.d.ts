import { ReportContentTypes, ReportReasons } from '@prisma/client';
export declare class CreateReportDto {
    contentType: ReportContentTypes;
    contentId: string;
    reason: ReportReasons;
    description: string;
}
