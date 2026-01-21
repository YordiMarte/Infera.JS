import { Request } from 'express';
import { Project, Service } from '@prisma/client';

export interface RequestWithProject extends Request {
    project: Project;
}