import { DefaultArgs } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";
import { ApplicationPrismaClient } from "../clients/application-prisma.client";
import { Injectable } from "@nestjs/common";

interface IKeyEntity {
    id: number;
    code: string;
    active: boolean;
}

interface IKeyCreate {
    code: string;
}

interface IKeyUpdate {
    id: number;
    active: boolean;
}

@Injectable()
export class KeyRepository {
    private repository: Prisma.KeyDelegate<
        Prisma.RejectOnNotFound |
        Prisma.RejectPerOperation, DefaultArgs
    >

    constructor(prisma: ApplicationPrismaClient) {
        this.repository = prisma.key;
    }

    create(data: IKeyCreate): Promise<IKeyEntity> {
        return this.repository.create({ data });
    }

    find(): Promise<IKeyEntity[]> {
        return this.repository.findMany({ where: { active: true }});
    }

    findByCode(code: string): Promise<IKeyEntity> {
        return this.repository.findUnique({ where: { code }});
    }

    deactivate(code: string): Promise<IKeyEntity>  {
        return this.repository.update({ data: { active: false }, where: { code } });
    }
}