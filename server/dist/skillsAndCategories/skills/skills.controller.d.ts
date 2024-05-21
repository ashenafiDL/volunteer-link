import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillsService } from './skills.service';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    create(createSkillDto: CreateSkillDto): Promise<{
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    findAll(): Promise<({
        _count: {
            users: number;
            projects: number;
        };
        category: {
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    })[]>;
    search(query: string): Promise<({
        _count: {
            users: number;
            projects: number;
        };
        category: {
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            users: number;
            projects: number;
        };
        category: {
            id: string;
            name: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<{
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
