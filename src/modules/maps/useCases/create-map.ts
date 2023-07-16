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

interface ICreateMapLayer {
    name: string;
    data: string;
}

interface ICreateMapArgs {
    name: string;
    description: string;
    type: MapType;
    height: number;
    width: number;
    layers: ICreateMapLayer[];
}

interface ICreateMapLayerOutput {
    id: number;
    name: string;
    data: string;
}

interface ICreateMapOutput {
    id: number;
    name: string;
    description: string;
    type: MapType;
    height: number;
    width: number;
    layers: ICreateMapLayerOutput[];
}


@Injectable()
export class CreateMap {
    constructor(
        private readonly mapRepository: MapRepository
    ) { }
    
    async handle(args: ICreateMapArgs): Promise<ICreateMapOutput> {
        return this.mapRepository.create(args)
    }
}
