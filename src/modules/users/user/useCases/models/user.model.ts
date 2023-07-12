interface IUserModelInitArgs {
    id?: number;
    username: string;
}

export class UserModel {
    id?: number;
    username: string;
    password: string;

    constructor(props: IUserModelInitArgs) {
        Object.assign(this, props);
    }
}