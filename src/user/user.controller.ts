import { CreateUserDto } from '@/user/dto/CreateUserDto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.createUser(createUserDto)
    }
}
