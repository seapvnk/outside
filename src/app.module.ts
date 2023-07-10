import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyModule } from './modules/users/key/key.module';
import { UserModule } from './modules/users/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, KeyModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
