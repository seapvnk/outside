import { randomString } from "src/helpers/string";

interface IKeyModelInitArgs {
    id?: number;
    code?: string;
}

export class KeyModel {
    id?: number;
    code: string;

    constructor(props: IKeyModelInitArgs = {}) {
        this.id = props.id;
        this.code = props.code || randomString(8);
    }
}