import { PrismaService } from 'src/prisma/prisma.service';
export declare class FilesService {
    private prisma;
    constructor(prisma: PrismaService);
    changeProfileImage(email: string, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    findProfilePicturePath(email: string): Promise<string>;
    deleteProfilePicture(id: string): Promise<{
        message: string;
    }>;
    changeLogo(id: string, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    findLogoPath(id: string): Promise<string>;
    deleteLogo(id: string): Promise<{
        message: string;
    }>;
    uploadPermit(id: string, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    findPermitPath(id: string): Promise<string>;
    uploadCV(id: string, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    findCVPath(id: string): Promise<string>;
    generateCertificate(orgLogoPath: string, vlLogoPath: string, fullName: string, projectTitle: string, organizationName: string, startDate: string, endDate: string): Promise<string>;
    jumpLine(doc: any, lines: any): void;
}
