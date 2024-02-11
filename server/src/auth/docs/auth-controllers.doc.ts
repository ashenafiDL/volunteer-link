import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

const applyDecorators =
  (decorators) =>
  (target: any, key: string, descriptor: PropertyDescriptor) => {
    decorators.forEach((decorator) => decorator(target, key, descriptor));
  };

export const ApiRegisterEndpoint = () => {
  return applyDecorators([
    ApiOperation({ summary: 'Register a new user' }),
    ApiResponse({ status: 201, description: 'User successfully registered.' }),
    ApiResponse({
      status: 400,
      description:
        'Invalid request data. Please provide valid user information.',
    }),
    ApiResponse({
      status: 409,
      description: 'A user with this username or email already exists',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error occurred. Please try again later.',
    }),
  ]);
};

export const ApiSignInEndpoint = () => {
  return applyDecorators([
    ApiOperation({ summary: 'Sign in to the system' }),
    ApiResponse({ status: 200, description: 'User signed in successfully.' }),
    ApiResponse({
      status: 401,
      description: 'Invalid credentials. Please check your email and password.',
    }),
    ApiResponse({
      status: 409,
      description: 'A user with this username or email already exists',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error occurred. Please try again later.',
    }),
  ]);
};

export const ApiForgotPasswordEndpoint = () => {
  return applyDecorators([
    ApiOperation({ summary: 'Initiate password reset' }),
    ApiBody({ type: ForgotPasswordDto }), // Documenting the request body
    ApiResponse({
      status: 200,
      description: 'Reset code verified successfully.',
    }),
    ApiResponse({ status: 404, description: 'User not found.' }),
    ApiResponse({
      status: 500,
      description:
        'Failed to send password reset code. Please try again later.d.',
    }),
  ]);
};

export const ApiVerifyResetCodeEndpoint = () => {
  return applyDecorators([
    ApiOperation({ summary: 'Verify password reset code' }),
    ApiResponse({
      status: 200,
      description: 'Reset code verified successfully.',
    }),
    ApiResponse({ status: 404, description: 'Not Found - User not found.' }),
    ApiResponse({
      status: 406,
      description: 'Not Acceptable - Verification code incorrect.',
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal Server Error - Failed to verify reset code. Please try again later.',
    }),
  ]);
};

export const ApiResetPasswordEndpoint = () => {
  return applyDecorators([
    ApiOperation({ summary: 'Reset password' }),
    ApiResponse({ status: 200, description: 'Password reset successfully.' }),
    ApiResponse({ status: 404, description: 'Not Found - User not found.' }),
    ApiResponse({
      status: 500,
      description:
        'Internal Server Error - Failed to reset password. Please try again later.',
    }),
  ]);
};