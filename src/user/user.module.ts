import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from '@/user/middlewares/auth.middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
