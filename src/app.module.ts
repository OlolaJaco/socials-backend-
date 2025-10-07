import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TagController } from '@/tag/tag.controller';
import { TagService } from '@/tag/tag.service';
import { TagModule } from '@/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule],
  controllers: [AppController, TagController],
  providers: [AppService, TagService],
})
export class AppModule {}
