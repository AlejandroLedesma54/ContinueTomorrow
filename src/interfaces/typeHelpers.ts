import { Request } from 'express';

export type strUnd = string | undefined;

export interface CustomRequest extends Request {
    user?: any;
}

export type Action = 'read' | 'create' | 'delete' | 'update' | 'readOne';