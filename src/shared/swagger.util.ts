import { ApiHeaderOptions } from '@nestjs/swagger/dist/decorators/api-header.decorator';

export const CareInfoHeaders: ApiHeaderOptions[] = [
  {
    name: 'care-id',
    description: 'Care ID of User',
  },
  {
    name: 'care-client-roles',
    description: 'Care Roles of User',
  },
  {
    name: 'care-jwt-validated',
    description: 'The correct state of JWT token. true or false',
  },
];
