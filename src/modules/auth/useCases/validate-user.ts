import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

interface IValidateUserArgs {
    username: string;
    password: string;
}

interface IValidateUserReturn {
    id: number;
    username: string;
}

@Injectable()
export class ValidateUser {
    constructor(private readonly userRepository: UserRepository) { }

    async handle({ username, password }: IValidateUserArgs): Promise<IValidateUserReturn> {
        const user = await this.userRepository.findByUsernameToAuth(username);
        
        if (user && compareSync(password, user.password)) {
            return user;
        }

        return null;
    }
}
