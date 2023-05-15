import { Request } from "express";

export interface IRequest extends Request {
  accountId?: number;
  hours?: {
    userEmail: string;
    date: Date;
    description: string;
    hours: number;
    minutes: number;
    projectName: string;
  };
  projectName?: string;
  userId?: number;
  projectId?: number;
  clientId?: string;
}
