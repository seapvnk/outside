import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateMap } from '../useCases/create-map';
import { CreateMapDto, CreateMapResponseDto } from './dto/create-map.dto';

@Controller('map')
export class KeyController {
    constructor(
        private readonly createMapUseCase: CreateMap
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() args: CreateMapDto): Promise<CreateMapResponseDto> {
        return this.createMapUseCase.handle(args);
    }
}
