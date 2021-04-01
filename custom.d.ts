interface IJsonPayload {
    userId: number;
    name: string;
    role: string;
    iat: number;
    exp?: number;
    iis: string;
    sub: string;
}

declare namespace Express {
    export interface Request {
        payload?: IJsonPayload
    }
}