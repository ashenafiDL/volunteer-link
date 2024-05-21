"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDeleteEducationEndpoint = exports.ApiUpdateEducationEndpoint = exports.ApiDeleteAccountEndpoint = exports.ApiRemoveSkillEndpoint = exports.ApiUpdateProfileEndpoint = exports.ApiGetUserByUsernameEndpoint = exports.ApiGetMeEndpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const applyCustomDecorators_1 = require("../../lib/applyCustomDecorators");
const ApiGetMeEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Fetch current user (own) profile' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return the current user profile.',
        }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'User profile cannot be found' }),
        (0, swagger_1.ApiResponse)({
            status: 401,
            description: 'Unauthorized',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to get user profile. Please try again later.',
        }),
    ]);
};
exports.ApiGetMeEndpoint = ApiGetMeEndpoint;
const ApiGetUserByUsernameEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Get user by username' }),
        (0, swagger_1.ApiParam)({
            name: 'username',
            description: 'Username of the user to retrieve',
        }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'User found and retrieved' }),
        (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Failed to find user' }),
    ]);
};
exports.ApiGetUserByUsernameEndpoint = ApiGetUserByUsernameEndpoint;
const ApiUpdateProfileEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Update current user (own) profile' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile update successfully' }),
        (0, swagger_1.ApiResponse)({
            status: 400,
            description: 'User provided invalid username and/or email',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'The server is experiencing an error. ',
        }),
    ]);
};
exports.ApiUpdateProfileEndpoint = ApiUpdateProfileEndpoint;
const ApiRemoveSkillEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Remove skill from current user (own) profile' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Skill removed successfully' }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'User not found or skill not found',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'The server is experiencing an error. ',
        }),
    ]);
};
exports.ApiRemoveSkillEndpoint = ApiRemoveSkillEndpoint;
const ApiDeleteAccountEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Delete current user (own) account' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile deleted successfully' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'The server is experiencing an error. ',
        }),
    ]);
};
exports.ApiDeleteAccountEndpoint = ApiDeleteAccountEndpoint;
const ApiUpdateEducationEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Update user education information' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Education updated successfully' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'User or education not found' }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Failed to update education' }),
    ]);
};
exports.ApiUpdateEducationEndpoint = ApiUpdateEducationEndpoint;
const ApiDeleteEducationEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Delete user education information' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Education deleted successfully' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'User or education not found' }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Failed to delete education' }),
    ]);
};
exports.ApiDeleteEducationEndpoint = ApiDeleteEducationEndpoint;
//# sourceMappingURL=users-controllers.doc.js.map