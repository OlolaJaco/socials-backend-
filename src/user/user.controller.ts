import { AuthRequest } from '@/types/expressRequest.interface';
import { CreateUserDto } from '@/user/dto/CreateUserDto';
import { LoginDto } from '@/user/dto/LoginUser.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Get, Post, Req, HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.createUser(createUserDto)
    }

    @Post('users/login')
    async loginUser(@Body() loginUserDto: LoginDto): Promise<any> {
        console.log(loginUserDto);
        return this.userService.loginUser(loginUserDto);
    }

    @Get('user')
    async getCurrentUser(@Req() request: AuthRequest): Promise<any> {
        console.log('request', request.user);
        
        if (!request.user || request.user.sub === undefined) {
            throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
        }
        
        return this.userService.findById(request.user.sub);
    }
}
