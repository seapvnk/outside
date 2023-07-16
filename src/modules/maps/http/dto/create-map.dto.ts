import { ApiProperty } from "@nestjs/swagger";

const MapType: {
    INTERIOR: 'INTERIOR';
    EXTERIOR: 'EXTERIOR';
} = {
    INTERIOR: 'INTERIOR',
    EXTERIOR: 'EXTERIOR'
};

type MapType = (typeof MapType)[keyof typeof MapType];

class CreateMapLayer {
    @ApiProperty()
    name: string;

    @ApiProperty()
    data: string;
}

export class CreateMapDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    type: MapType;

    @ApiProperty()
    height: number;

    @ApiProperty()
    width: number;

    @ApiProperty()
    layers: CreateMapLayer[];
}

interface CreateMapLayerResponseDto {
    id: number;
    name: string;
    data: string;
}

export class CreateMapResponseDto {
    id: number;
    name: string;
    description: string;
    type: MapType;
    height: number;
    width: number;
    layers: CreateMapLayerResponseDto[];
}