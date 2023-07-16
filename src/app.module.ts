import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyModule } from './modules/users/key/key.module';
import { UserModule } from './modules/users/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationErrorFilter } from './common/error/filters/application-error.filter';
import { InternalServerErrorFilter } from './common/error/filters/internal-server-error.filter';
import { AuthModule } from './modules/auth/auth.module';
import { MapsModule } from './modules/maps/maps.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule, KeyModule, AuthModule, 
    MapsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ApplicationErrorFilter,
    }
  ],
})
export class AppModule {}
