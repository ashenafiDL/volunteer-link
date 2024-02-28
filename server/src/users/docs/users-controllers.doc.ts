import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyCustomDecorators } from 'src/lib/applyCustomDecorators';

export const ApiGetMeEndpoint = () => {
  return applyCustomDecorators([
    ApiOperation({ summary: 'Fetch current user (own) profile' }),
    ApiResponse({
      status: 200,
      description: 'Return the current user profile.',
    }),
    ApiResponse({ status: 404, description: 'User profile cannot be found' }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 500,
      description:
        'Internal Server Error - Failed to get user profile. Please try again later.',
    }),
  ]);
};

export const ApiUpdateProfileEndpoint = () => {
  return applyCustomDecorators([
    ApiOperation({ summary: 'Update current user (own) profile' }),
    ApiResponse({ status: 200, description: 'Profile update successfully' }),
    ApiResponse({
      status: 400,
      description: 'User provided invalid username and/or email',
    }),
    ApiResponse({
      status: 500,
      description: 'The server is experiencing an error. ',
    }),
  ]);
};

export const ApiDeleteAccountEndpoint = () => {
  return applyCustomDecorators([
    ApiOperation({ summary: 'Delete current user (own) account' }),
    ApiResponse({ status: 200, description: 'Profile deleted successfully' }),
    ApiResponse({ status: 404, description: 'User not found' }),
    ApiResponse({
      status: 500,
      description: 'The server is experiencing an error. ',
    }),
  ]);
};
