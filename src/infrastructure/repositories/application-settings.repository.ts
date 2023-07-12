import { DefaultArgs } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";
import { ApplicationPrismaClient } from "../clients/application-prisma.client";
import { Injectable } from "@nestjs/common";

interface IApplicationSettingsEntity {
    id: number;
    masterKeyUsed: boolean;
}

interface IApplicationSettingsUpdate {
    masterKeyUsed?: boolean;
}

@Injectable()
export class ApplicationSettingsRepository {
    private repository: Prisma.ApplicationSettingsDelegate<
        Prisma.RejectOnNotFound |
        Prisma.RejectPerOperation, DefaultArgs
    >

    constructor(prisma: ApplicationPrismaClient) {
        this.repository = prisma.applicationSettings
    }

    create(): Promise<IApplicationSettingsEntity> {
        return this.repository.create({ data: {} });
    }

    find(): Promise<IApplicationSettingsEntity> {
        return this.repository.findFirst();
    }

    update(data: IApplicationSettingsUpdate): Promise<IApplicationSettingsEntity> {
        return this.repository.update({ data: data, where: { id: 1 } });
    }
}