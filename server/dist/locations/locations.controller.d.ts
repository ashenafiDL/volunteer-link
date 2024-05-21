import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    create(createLocationDto: CreateLocationDto): Promise<{
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
