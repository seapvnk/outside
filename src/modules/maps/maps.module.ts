import { Module } from '@nestjs/common';
import { CreateMap } from './useCases/create-map';

@Module({
    providers: [CreateMap]
})
export class MapsModule {}
