"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDeleteProfilePictureEndpoint = exports.ApiGetProfilePictureEndpoint = exports.ApiProfilePicUpdateEndpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const applyCustomDecorators_1 = require("../../lib/applyCustomDecorators");
const ApiProfilePicUpdateEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Update user profile picture' }),
        (0, swagger_1.ApiResponse)({
            status: 201,
            description: 'User profile picture updated successfully',
        }),
        (0, swagger_1.ApiResponse)({
            status: 401,
            description: 'Unauthorized',
        }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'User with specified email does not exist',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Failed to update user profile image. Please try again later.',
        }),
        (0, swagger_1.ApiParam)({ name: 'file', type: 'string', format: 'binary' }),
    ]);
};
exports.ApiProfilePicUpdateEndpoint = ApiProfilePicUpdateEndpoint;
const ApiGetProfilePictureEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Get profile picture of a user by email' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Profile picture retrieved successfully',
        }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'User or profile picture not found',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to fetch profile picture. Please try again later.',
        }),
    ]);
};
exports.ApiGetProfilePictureEndpoint = ApiGetProfilePictureEndpoint;
const ApiDeleteProfilePictureEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Delete own profile picture.' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Profile picture deleted successfully',
        }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'User with the specified id not found',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to delete profile picture. Please try again later.',
        }),
    ]);
};
exports.ApiDeleteProfilePictureEndpoint = ApiDeleteProfilePictureEndpoint;
//# sourceMappingURL=files-controllers.docs.js.map