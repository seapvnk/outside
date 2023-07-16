import { DefaultArgs } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";
import { ApplicationPrismaClient } from "../clients/application-prisma.client";
import { Injectable } from "@nestjs/common";

const MapType: {
    INTERIOR: 'INTERIOR';
    EXTERIOR: 'EXTERIOR';
} = {
    INTERIOR: 'INTERIOR',
    EXTERIOR: 'EXTERIOR'
};

type MapType = (typeof MapType)[keyof typeof MapType];

interface IMapLayerEntity {
    id: number;
    mapId: number;
    name: string;
    data: string
}

interface IMapEntity {
    id: number;
    name: string;
    description: string;
    width: number;
    height: number;
    type: MapType
    layers: IMapLayerEntity[];
}

interface IMapLayerCreate {
    name: string;
    data: string
}

interface IMapCreate {
    name: string;
    description: string;
    width: number;
    height: number;
    type: MapType
    layers: IMapLayerCreate[];
}

@Injectable()
export class MapRepository {
    private repository: Prisma.MapDelegate<
        Prisma.RejectOnNotFound |
        Prisma.RejectPerOperation, DefaultArgs
    >

    constructor(private readonly prisma: ApplicationPrismaClient) {
        this.repository = this.prisma.map;
    }

    create({
        name, description, type,
        height, width, layers
    }: IMapCreate): Promise<IMapEntity> {
        return this.repository.create({ 
            data: {
                name, description, type,
                height, width,
                layers: {
                    createMany: {
                        data: layers.map(({ name, data }) => ({ name, data }))
                    }
                }
            },
            include: { layers: true }
        });
    }

    findById(id: number): Promise<IMapEntity> {
        return this.repository.findUnique({ 
            where: { id }, 
            include: { layers: true }
        });
    }

    find(): Promise<IMapEntity[]> {
        return this.repository.findMany({ include: { layers: true }});
    }

    delete(id: number) {
        this.repository.delete({ where: { id }})
    }
}