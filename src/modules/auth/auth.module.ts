import { Module } from '@nestjs/common';
import { ValidateUser } from './useCases/validate-user';
import { LocalStrategy } from './useCases/strategies/local.strategy';
import { UserModule } from '../users/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Login } from './useCases/login';
import { AuthController } from './http/auth.controller';
import { JwtStrategy } from './useCases/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule, 
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_KEY'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES') },
      }),
    }),
  ],
  providers: [
    ValidateUser, 
    Login, 
    LocalStrategy,
    JwtStrategy,
    ConfigService
  ]
})
export class AuthModule {}
