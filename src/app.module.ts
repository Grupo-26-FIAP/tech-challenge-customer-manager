import { PostgresConfigService } from '@Infrastructure/typeorm/config/postgres.config.service';
import { RoleModel } from '@Infrastructure/typeorm/models/role.model';
import { UserRoleModel } from '@Infrastructure/typeorm/models/user-role.model';
import { UserModel } from '@Infrastructure/typeorm/models/user.model';
import { RoleSeeder } from '@Infrastructure/typeorm/seed/role.seeder';
import { SeederProvider } from '@Infrastructure/typeorm/seed/seeder.provider';
import { UserRoleSeeder } from '@Infrastructure/typeorm/seed/user-role.seeder';
import { UserSeeder } from '@Infrastructure/typeorm/seed/user.seeder';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariableModule } from '@Shared/config/environment-variable/environment-variable.module';
import { CreateUserUseCase } from './application/use-cases/user/create-user.use-case';
import { GetOneUserUseCase } from './application/use-cases/user/get-one-user.use-case';
import { GetUserByRoleUseCase } from './application/use-cases/user/get-user-by-role.use-case';
import { IUserRepositorySymbol } from './domain/repositories/user.repository';
import { IUserServiceSymbol } from './domain/services/user/user.service';
import { UserServiceImpl } from './domain/services/user/user.serviceImp';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
import { HealthController } from './presentation/controllers/health.controller';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({}),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([UserModel, RoleModel, UserRoleModel]),

    EnvironmentVariableModule.forRoot({ isGlobal: true }),
    TerminusModule,
  ],
  providers: [
    RoleSeeder,
    UserSeeder,
    UserRoleSeeder,
    SeederProvider,
    CreateUserUseCase,
    GetOneUserUseCase,
    GetUserByRoleUseCase,
    {
      provide: IUserServiceSymbol,
      useClass: UserServiceImpl,
    },
    {
      provide: IUserRepositorySymbol,
      useClass: UserRepositoryImpl,
    },
  ],
  controllers: [UserController, HealthController],
})
export class AppModule {}
