import { CreateUserDto } from '@/user/dto/CreateUserDto';
import { LoginDto } from '@/user/dto/LoginUser.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.createUser(createUserDto)
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginDto): Promise<any> {
        console.log(loginUserDto);
        return this.userService.loginUser(loginUserDto);
    }
}
