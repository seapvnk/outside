import { Injectable } from '@nestjs/common';
import { ApplicationError } from 'src/common/error/errors/application.error';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { hashSync } from 'bcrypt';
import { KeyRepository } from 'src/infrastructure/repositories/key.repository';

const PASSWORD_SALT = 10;

interface ICreateUserServiceArgs {
    username: string;
    password: string;
    key?: string;
}

interface ICreateUserReturn {
    id?: number;
    username: string;
}

@Injectable()
export class CreateUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly keyRepository: KeyRepository
    ) { }
    
    async handle(
        { username, password, key }: ICreateUserServiceArgs
    ): Promise<ICreateUserReturn> {
        const userRegisterKey = await this.keyRepository.findByCode(key);
        const superUser = !!userRegisterKey && userRegisterKey.active;

        if (userRegisterKey && !userRegisterKey.active) {
            throw new ApplicationError('KEY_ALREADY_USED');
        }

        if (userRegisterKey) {
            this.keyRepository.deactivate(key);
        }

        const user: ICreateUserReturn = await this.userRepository.create({
            username,
            superUser,
            password: hashSync(password, PASSWORD_SALT),
        });

        return user;
    }
}
