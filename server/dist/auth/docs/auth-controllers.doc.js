"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUpdatePasswordEndpoint = exports.ApiVerifyVerificationCodeEndpoint = exports.ApiResetPasswordEndpoint = exports.ApiVerifyResetCodeEndpoint = exports.ApiForgotPasswordEndpoint = exports.ApiSignInEndpoint = exports.ApiRegisterEndpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const applyCustomDecorators_1 = require("../../lib/applyCustomDecorators");
const forgot_password_dto_1 = require("../dto/forgot-password.dto");
const ApiRegisterEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
        (0, swagger_1.ApiResponse)({ status: 201, description: 'User successfully registered.' }),
        (0, swagger_1.ApiResponse)({
            status: 400,
            description: 'Invalid request data. Please provide valid user information.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 409,
            description: 'A user with this username or email already exists',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal server error occurred. Please try again later.',
        }),
    ]);
};
exports.ApiRegisterEndpoint = ApiRegisterEndpoint;
const ApiSignInEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Sign in to the system' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'User signed in successfully.' }),
        (0, swagger_1.ApiResponse)({
            status: 401,
            description: 'Invalid credentials. Please check your email and password.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 409,
            description: 'A user with this username or email already exists',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal server error occurred. Please try again later.',
        }),
    ]);
};
exports.ApiSignInEndpoint = ApiSignInEndpoint;
const ApiForgotPasswordEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Initiate password reset' }),
        (0, swagger_1.ApiBody)({ type: forgot_password_dto_1.ForgotPasswordDto }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Reset code verified successfully.',
        }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found.' }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Failed to send password reset code. Please try again later.d.',
        }),
    ]);
};
exports.ApiForgotPasswordEndpoint = ApiForgotPasswordEndpoint;
const ApiVerifyResetCodeEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Verify password reset code' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Reset code verified successfully.',
        }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - User not found.' }),
        (0, swagger_1.ApiResponse)({
            status: 406,
            description: 'Not Acceptable - Verification code incorrect.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to verify reset code. Please try again later.',
        }),
    ]);
};
exports.ApiVerifyResetCodeEndpoint = ApiVerifyResetCodeEndpoint;
const ApiResetPasswordEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Reset password' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successfully.' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - User not found.' }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to reset password. Please try again later.',
        }),
    ]);
};
exports.ApiResetPasswordEndpoint = ApiResetPasswordEndpoint;
const ApiVerifyVerificationCodeEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Verify email verification code' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Email verification code verified successfully.',
        }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - User not found.' }),
        (0, swagger_1.ApiResponse)({
            status: 406,
            description: 'Not Acceptable - Verification code incorrect.',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to verify reset code. Please try again later.',
        }),
    ]);
};
exports.ApiVerifyVerificationCodeEndpoint = ApiVerifyVerificationCodeEndpoint;
const ApiUpdatePasswordEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({ summary: 'Update user password' }),
        (0, swagger_1.ApiResponse)({ status: 200, description: 'Password updated successfully' }),
        (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
        (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
        (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
        (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    ]);
};
exports.ApiUpdatePasswordEndpoint = ApiUpdatePasswordEndpoint;
//# sourceMappingURL=auth-controllers.doc.js.map