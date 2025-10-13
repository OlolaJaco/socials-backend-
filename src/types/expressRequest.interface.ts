import { UserEntity } from "@/user/user.entity";
import { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
    sub: number;
    username: string;
    email: string;
    iat?: number;
    exp?: number;
  };
}