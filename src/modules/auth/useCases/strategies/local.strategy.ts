
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateUser } from '../validate-user';
import { ApplicationError } from 'src/common/error/errors/application.error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUser: ValidateUser) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUser.handle({ username, password });
    
    if (!user) {
      throw new ApplicationError('UNAUTHORIZED');
    }

    return user;
  }
}