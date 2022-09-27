import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const RoleKeyMetadata = 'roles';

export enum RoleUser {
  Admin = 'admin',
  Operation = 'operation',
  Client = 'client',
}

export const ROLE_KEY = 'roles';

export const Roles = (...roles: RoleUser[]): CustomDecorator => SetMetadata(RoleKeyMetadata, roles);

export const AnonymousKeyMetadata = 'anonymous';

export const AnonymousEndpoint = SetMetadata(AnonymousKeyMetadata, true);
