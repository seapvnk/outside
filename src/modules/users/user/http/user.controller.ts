import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUser } from '../useCases/create-user';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUser
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() args: CreateUserDto): Promise<CreateUserResponseDto> {
        return this.createUserUseCase.handle(args);
    }
}
