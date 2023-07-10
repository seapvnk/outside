import { Module } from '@nestjs/common';
import { KeyController } from './http/key.controller';
import { CreateKey } from './useCases/create-key';
import { KeyRepository } from 'src/infrastructure/repositories/key.repository';
import { ApplicationSettingsRepository } from 'src/infrastructure/repositories/application-settings.repository';
import { ApplicationPrismaClient } from 'src/infrastructure/clients/application-prisma.client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [KeyController],
  providers: [
    CreateKey, 
    KeyRepository, 
    ApplicationSettingsRepository,
    ApplicationPrismaClient,
    ConfigModule,
    ConfigService
  ]
})
export class KeyModule {}
