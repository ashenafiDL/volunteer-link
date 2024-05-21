"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRemoveSkillCategoryEndpoint = exports.ApiUpdateSkillCategoryEndpoint = exports.ApiFindSkillCategoryByNameEndpoint = exports.ApiFindSkillCategoryByIdEndpoint = exports.ApiFindAllSkillCategoriesEndpoint = exports.ApiCreateSkillCategoryEndpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const applyCustomDecorators_1 = require("../../../lib/applyCustomDecorators");
const ApiCreateSkillCategoryEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Create a new skill category' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Skill category created successfully',
        }),
        (0, swagger_1.ApiResponse)({
            status: 401,
            description: 'Unauthorized',
        }),
        (0, swagger_1.ApiResponse)({
            status: 409,
            description: 'Conflict - A category with the same name already exists',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to create skill category. Please try again later.',
        }),
    ]);
};
exports.ApiCreateSkillCategoryEndpoint = ApiCreateSkillCategoryEndpoint;
const ApiFindAllSkillCategoriesEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Fetch all skill categories' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return all skill categories.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to find all skill categories. Please try again later.',
        }),
    ]);
};
exports.ApiFindAllSkillCategoriesEndpoint = ApiFindAllSkillCategoriesEndpoint;
const ApiFindSkillCategoryByIdEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Fetch a skill category by ID' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return the skill category with the specified ID.',
        }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill category not found' }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to find skill category. Please try again later.',
        }),
    ]);
};
exports.ApiFindSkillCategoryByIdEndpoint = ApiFindSkillCategoryByIdEndpoint;
const ApiFindSkillCategoryByNameEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Fetch a skill category by name' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return the skill category with the specified name.',
        }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill category not found' }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to find skill category. Please try again later.',
        }),
    ]);
};
exports.ApiFindSkillCategoryByNameEndpoint = ApiFindSkillCategoryByNameEndpoint;
const ApiUpdateSkillCategoryEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Update a skill category by ID' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return the updated skill category.',
        }),
        (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill category not found' }),
        (0, swagger_1.ApiResponse)({
            status: 409,
            description: 'Conflict - A category with the same name already exists',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to update skill category. Please try again later.',
        }),
    ]);
};
exports.ApiUpdateSkillCategoryEndpoint = ApiUpdateSkillCategoryEndpoint;
const ApiRemoveSkillCategoryEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Delete a skill category by ID' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Category deleted successfully.',
        }),
        (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill category not found' }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to delete skill category. Please try again later.',
        }),
    ]);
};
exports.ApiRemoveSkillCategoryEndpoint = ApiRemoveSkillCategoryEndpoint;
//# sourceMappingURL=skill-categories-controllers.doc.js.map