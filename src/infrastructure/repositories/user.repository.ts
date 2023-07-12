import { DefaultArgs } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";
import { ApplicationPrismaClient } from "../clients/application-prisma.client";
import { Injectable } from "@nestjs/common";

interface IUserEntity {
    id: number;
    username: string;
}

interface IUserCreate {
    username: string;
    password: string;
    superUser?: boolean;
}

interface IUserUpdate {
    id: number;
    username?: string;
    password?: string;
    superUser?: boolean;
}

@Injectable()
export class UserRepository {
    private repository: Prisma.UserDelegate<
        Prisma.RejectOnNotFound |
        Prisma.RejectPerOperation, DefaultArgs
    >

    constructor(private readonly prisma: ApplicationPrismaClient) {
        this.repository = this.prisma.user;
    }

    create(data: IUserCreate): Promise<IUserEntity> {
        return this.repository.create({ 
            data,
            select: {
                id: true,
                username: true,
            } 
        });
    }

    find(): Promise<IUserEntity[]> {
        return this.repository.findMany();
    }

    update({ id, username, password, superUser }: IUserUpdate): Promise<IUserEntity> {
        return this.repository.update({
            data: { 
                username, 
                password,
                superUser
            },
            where: { id } 
        });
    }
}