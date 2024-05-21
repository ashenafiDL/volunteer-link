import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
export declare class SkillCategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSkillCategoryDto: CreateSkillCategoryDto): Promise<{
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        _count: {
            skills: number;
        };
    } & {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOneById(id: string): Promise<{
        _count: {
            skills: number;
        };
    } & {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByName(name: string): Promise<{
        _count: {
            skills: number;
        };
    } & {
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateSkillCategoryDto: UpdateSkillCategoryDto): Promise<{
        id: string;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
