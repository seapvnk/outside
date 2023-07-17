const MapType: {
    INTERIOR: 'INTERIOR';
    EXTERIOR: 'EXTERIOR';
} = {
    INTERIOR: 'INTERIOR',
    EXTERIOR: 'EXTERIOR'
};

type MapType = (typeof MapType)[keyof typeof MapType];

export class FindAllMapOutput {
    id: number;
    name: string;
    description: string;
    type: MapType;
    height: number;
    width: number;
}