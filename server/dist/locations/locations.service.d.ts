import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(name: string, code: string): Promise<{
        id: string;
        name: string;
        code: string;
    }>;
    findAll(): Promise<({
        _count: {
            users: number;
            projects: number;
            organizations: number;
        };
    } & {
        id: string;
        name: string;
        code: string;
    })[]>;
    findOneById(id: string): Promise<{
        id: string;
        name: string;
        code: string;
    }>;
    findOneByName(name: string): Promise<{
        id: string;
        name: string;
        code: string;
    }>;
    findOneByShortCode(code: string): Promise<{
        id: string;
        name: string;
        code: string;
    }>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<{
        id: string;
        name: string;
        code: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
