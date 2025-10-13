import { CreateUserDto } from '@/user/dto/CreateUserDto';
import { UserEntity } from '@/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/user/dto/LoginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ user: any }> {
    if (
      await this.userRepository.findOne({
        where: { email: createUserDto.email },
      })
    ) {
      throw new HttpException(
        'Email already in use',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return this.generateUserResponse(user);
  }

  async loginUser(loginUserDto: LoginDto): Promise<{ user: any }> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const matchPassword = await compare(loginUserDto.password, user.password);

    if (!matchPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;

    return this.generateUserResponse(user);
  }
  
  // Get a single user by ID
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    delete user.password

    return user;
  }

  generateToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  generateUserResponse(user: UserEntity) {
    return {
      user: {
        ...user,
        token: this.generateToken(user),
      },
    };
  }
}
