"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDeleteLocationEndpoint = exports.ApiUpdateLocationEndpoint = exports.ApiFindOneByShortCodeEndpoint = exports.ApiFindOneByNameEndpoint = exports.ApiFindOneByIdEndpoint = exports.ApiGetLocationEndpoint = exports.ApiCreateLocationEndpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const applyCustomDecorators_1 = require("../../lib/applyCustomDecorators");
const ApiCreateLocationEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Create a new location' }),
        (0, swagger_1.ApiCreatedResponse)({ description: 'Location created successfully.' }),
        (0, swagger_1.ApiResponse)({
            status: 409,
            description: 'Conflict - Location already exists.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to create location.',
        }),
    ]);
};
exports.ApiCreateLocationEndpoint = ApiCreateLocationEndpoint;
const ApiGetLocationEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Get all locations' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Locations found successfully.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to retrieve locations. Please try again later.',
        }),
    ]);
};
exports.ApiGetLocationEndpoint = ApiGetLocationEndpoint;
const ApiFindOneByIdEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Get a location by ID' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Location found successfully.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'Not Found - Location with the specified ID cannot be found.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to retrieve locations. Please try again later.',
        }),
    ]);
};
exports.ApiFindOneByIdEndpoint = ApiFindOneByIdEndpoint;
const ApiFindOneByNameEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Get a location by name' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Location found successfully.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'Not Found - Location with the specified name cannot be found.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to retrieve locations. Please try again later.',
        }),
    ]);
};
exports.ApiFindOneByNameEndpoint = ApiFindOneByNameEndpoint;
const ApiFindOneByShortCodeEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Get a location by short code' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Location found successfully.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'Not Found - Location with the specified short code cannot be found.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to retrieve locations. Please try again later.',
        }),
    ]);
};
exports.ApiFindOneByShortCodeEndpoint = ApiFindOneByShortCodeEndpoint;
const ApiUpdateLocationEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Update a location' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Location updated successfully.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'Not Found - Location with the specified ID cannot be found.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to update location. Please try again later.',
        }),
    ]);
};
exports.ApiUpdateLocationEndpoint = ApiUpdateLocationEndpoint;
const ApiDeleteLocationEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Delete a location' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Location successfully deleted.' }),
        (0, swagger_1.ApiResponse)({
            status: 404,
            description: 'Not Found - Location with the specified ID cannot be found.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to delete location. Please try again later.',
        }),
    ]);
};
exports.ApiDeleteLocationEndpoint = ApiDeleteLocationEndpoint;
//# sourceMappingURL=locations-controllers.docs.js.map