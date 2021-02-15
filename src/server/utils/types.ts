import { Request } from 'express';
import { UsersTable } from '../db/models';

export interface IPayload {
    userid: number,
    email: string,
    username: string
}

export interface ReqUser extends Request {
    user?: UsersTable | IPayload;
}