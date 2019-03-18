import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Watch } from './watch.entity';
import { WatchService } from './watch.service';
import { WatchController } from './watch.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Watch]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [WatchService],
  providers: [
    WatchService
  ],
  controllers: [WatchController],
})

export class WatchModule {}
