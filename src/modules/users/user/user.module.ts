import { Module } from '@nestjs/common';
import { CreateUser } from './useCases/create-user';
import { KeyRepository } from 'src/infrastructure/repositories/key.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserController } from './http/user.controller';
import { ApplicationPrismaClient } from 'src/infrastructure/clients/application-prisma.client';

@Module({
    controllers: [UserController],
    providers: [
        CreateUser, 
        KeyRepository, 
        UserRepository,
        ApplicationPrismaClient
    ]
})
export class UserModule {}
