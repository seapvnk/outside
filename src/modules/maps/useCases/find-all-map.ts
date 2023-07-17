import { Injectable } from '@nestjs/common';
import { MapRepository } from 'src/infrastructure/repositories/map.repository';

const MapType: {
    INTERIOR: 'INTERIOR';
    EXTERIOR: 'EXTERIOR';
} = {
    INTERIOR: 'INTERIOR',
    EXTERIOR: 'EXTERIOR'
};

type MapType = (typeof MapType)[keyof typeof MapType];

interface IMapOutput {
    id: number;
    name: string;
    description: string;
    type: MapType;
    height: number;
    width: number;
}


@Injectable()
export class FindAllMap {
    constructor(
        private readonly mapRepository: MapRepository
    ) { }
    
    async handle(): Promise<IMapOutput[]> {
        return this.mapRepository.find();
    }
}
