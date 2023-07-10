import { randomBytes } from "crypto";

export const randomString = 
    (size: number) => randomBytes(size > 2? size / 2: 1).toString('hex');