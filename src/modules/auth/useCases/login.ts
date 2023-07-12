import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface ILoginArgs {
    id: string;
    username: string;
}

interface ILoginReturn {
    token: string;
}

@Injectable()
export class Login {
    constructor(private readonly jwtService: JwtService) { }

    async handle({ id, username }: ILoginArgs): Promise<ILoginReturn> {
        const payload = { sub: id, username };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
