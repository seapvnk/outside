import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateKey } from '../useCases/create-key';
import { CreateKeyDto, CreateKeyResponseDto } from './dto/create-key.dto';

@Controller('key')
export class KeyController {
    constructor(
        private readonly createKeyUseCase: CreateKey
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() args: CreateKeyDto): Promise<CreateKeyResponseDto> {
        return this.createKeyUseCase.handle(args);
    }
}
