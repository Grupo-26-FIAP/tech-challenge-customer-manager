import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { UserRoleSeeder } from './user-role.seeder';
import { UserSeeder } from './user.seeder';

@Injectable()
export class SeederProvider implements OnModuleInit {
  constructor(
    private readonly userSeeder: UserSeeder,
    private readonly userRoleSeeder: UserRoleSeeder,
    private readonly roleSeeder: RoleSeeder,
  ) {}

  async onModuleInit() {
    await this.roleSeeder.seed();
    await this.userSeeder.seed();
    await this.userRoleSeeder.seed();
  }
}
