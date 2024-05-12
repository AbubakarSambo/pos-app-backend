import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { RolesPermissionsModule } from './roles_permissions/roles_permissions.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MenusModule } from './menus/menus.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { OrderSourcesModule } from './order-sources/order-sources.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        trustServerCertificate: true,
        Encrypt: true,
        IntegratedSecurity: true,
      },
    }),
    UsersModule,
    AuthModule,
    OrganizationsModule,
    PermissionsModule,
    RolesModule,
    RolesPermissionsModule,
    CategoriesModule,
    MenusModule,
    CustomersModule,
    OrdersModule,
    OrderSourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
