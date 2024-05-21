"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDeleteSkillEndpoint = exports.ApiUpdateSkillEndpoint = exports.ApiFindOneSkillEndpoint = exports.ApiSearchSkillsEndpoint = exports.ApiFindAllSkillsEndpoint = exports.ApiCreateSkillEndpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const applyCustomDecorators_1 = require("../../../lib/applyCustomDecorators");
const create_skill_dto_1 = require("../dto/create-skill.dto");
const ApiCreateSkillEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Create a new skill' }),
        (0, swagger_1.ApiBody)({ type: create_skill_dto_1.CreateSkillDto }),
        (0, swagger_1.ApiResponse)({
            status: 201,
            description: 'Skill created successfully',
        }),
        (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
        (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Category not found' }),
        (0, swagger_1.ApiResponse)({
            status: 409,
            description: 'A skill with the same name already exists',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error',
        }),
    ]);
};
exports.ApiCreateSkillEndpoint = ApiCreateSkillEndpoint;
const ApiFindAllSkillsEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Find all skills' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return all skills with project and user counts',
        }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    ]);
};
exports.ApiFindAllSkillsEndpoint = ApiFindAllSkillsEndpoint;
const ApiSearchSkillsEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Search skills by name' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return all skills that match the query with project and user counts',
        }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    ]);
};
exports.ApiSearchSkillsEndpoint = ApiSearchSkillsEndpoint;
const ApiFindOneSkillEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Find a skill by ID' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return the skill with project and user counts',
        }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found' }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    ]);
};
exports.ApiFindOneSkillEndpoint = ApiFindOneSkillEndpoint;
const ApiUpdateSkillEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Update a skill by ID' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Skill updated successfully' }),
        (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
        (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill or category not found' }),
        (0, swagger_1.ApiResponse)({
            status: 409,
            description: 'Conflict - Skill with the same name already exists',
        }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    ]);
};
exports.ApiUpdateSkillEndpoint = ApiUpdateSkillEndpoint;
const ApiDeleteSkillEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Delete a skill by ID' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Skill deleted successfully' }),
        (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Skill not found' }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    ]);
};
exports.ApiDeleteSkillEndpoint = ApiDeleteSkillEndpoint;
//# sourceMappingURL=skills-controllers.doc.js.map