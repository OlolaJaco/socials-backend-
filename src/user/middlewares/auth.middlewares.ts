import { AuthRequest } from '@/types/expressRequest.interface';
import { jwtConstants } from '@/user/constants';
import { UserService } from '@/user/user.service';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    // Log the authorization header for debugging
    // console.log('Headers received:', req.headers);f
    
    if (!req.headers.authorization) {
      console.log('No authorization header found');
      req.user = undefined;
      return next();
    }
    
    // Extract the token - handle both "Bearer token" format and raw token format
    let token;
    if (req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      // Assume the entire header is the token
      token = req.headers.authorization;
    }
    
    console.log('Token found:', token);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      
      console.log('Valid token, payload:', payload);
      
      // Assign the payload to the request object
      req.user = payload;
      return next();
    } catch (error) {
      console.log('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
