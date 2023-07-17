import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateMap } from '../useCases/create-map';
import { CreateMapDto, CreateMapResponseDto } from './dto/create-map.dto';
import { FindAllMap } from '../useCases/find-all-map';
import { FindAllMapOutput } from './dto/find-all-map.dto';

@Controller('map')
export class KeyController {
    constructor(
        private readonly createMapUseCase: CreateMap,
        private readonly findAllMapUseCase: FindAllMap
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() args: CreateMapDto): Promise<CreateMapResponseDto> {
        return this.createMapUseCase.handle(args);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    find(@Body() args: CreateMapDto): Promise<FindAllMapOutput> {
        return this.createMapUseCase.handle(args);
    }
}
