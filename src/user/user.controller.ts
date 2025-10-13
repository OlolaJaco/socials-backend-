import { AuthRequest } from '@/types/expressRequest.interface';
import { CreateUserDto } from '@/user/dto/CreateUserDto';
import { LoginDto } from '@/user/dto/LoginUser.dto';
import { UpdateUserDto } from '@/user/dto/UpdateUser.dto';
import { AuthGuard } from '@/user/guards/auth.guard';
import { UserService } from '@/user/user.service';
import { Body, Controller, Get, Post, Req, HttpException, HttpStatus, UseGuards, Put } from '@nestjs/common';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.createUser(createUserDto)
    }

    @Post('users/login')
    async loginUser(@Body() loginUserDto: LoginDto): Promise<any> {
        // console.log(loginUserDto);
        return this.userService.loginUser(loginUserDto);
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateUser(
        @Req() request: AuthRequest,
        @Body() updateUserDto: Partial<UpdateUserDto>
    ): Promise<any> {
        if (!request.user || !request.user.sub) {
            throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
        }
        
        return this.userService.updateUser(request.user.sub, updateUserDto);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async getCurrentUser(@Req() request: AuthRequest): Promise<any> {
        // console.log('request', request.user);
        
        if (!request.user || request.user.sub === undefined) {
            throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
        }
        
        return this.userService.findById(request.user.sub);
    }
}
