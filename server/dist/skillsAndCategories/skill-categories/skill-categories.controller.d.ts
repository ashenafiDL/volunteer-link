import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { SkillCategoriesService } from './skill-categories.service';
export declare class SkillCategoriesController {
    private readonly skillCategoriesService;
    constructor(skillCategoriesService: SkillCategoriesService);
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
