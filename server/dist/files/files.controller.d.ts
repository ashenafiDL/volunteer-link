import { CertificatesService } from 'src/certificates/certificates.service';
import { UpdateProfilePicDto } from './dto/update-profile-pic.dto';
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    private readonly certificatesService;
    constructor(filesService: FilesService, certificatesService: CertificatesService);
    uploadFile(updateProfilePicDto: UpdateProfilePicDto, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    serveProfilePicture(email: string, res: any): Promise<void>;
    deleteAvatar(req: any): Promise<{
        message: string;
    }>;
    uploadLogo(id: string, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    serveLogo(id: string, res: any): Promise<void>;
    deleteLogo(id: string): Promise<{
        message: string;
    }>;
    uploadPermit(id: string, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    servePermit(id: string, res: any): Promise<void>;
    uploadCV(id: string, file: Express.Multer.File): Promise<{
        massage: string;
    }>;
    serveCV(id: string, res: any): Promise<void>;
    serveCertificate(id: string, res: any): Promise<void>;
}
