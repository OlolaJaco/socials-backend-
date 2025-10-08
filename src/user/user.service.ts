import { CreateUserDto } from '@/user/dto/CreateUserDto';
import { UserEntity } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return user ;
    }
}
