import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WatchModule } from '../watch/watch.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    WatchModule,
  ],
  exports: [UserService],
  providers: [
    UserService
  ],
  controllers: [UserController],
})
export class UserModule { }
