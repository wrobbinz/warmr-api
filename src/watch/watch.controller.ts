import { Controller, Get, Query, Post, Body, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WatchService } from './watch.service';
import { Watch, CreateWatchDto, UpdateWatchDto } from './watch.entity';
import { User } from '../common/decorators/user.decorator';
import { UpdateDateColumn } from 'typeorm';


@ApiBearerAuth() @ApiUseTags('watch')

@Controller('watch')
export class WatchController {
  constructor(private readonly watchService: WatchService) { }

  @Post()
  @UseGuards(AuthGuard())
  Create(@Body() createWatchDto: CreateWatchDto, @User() user) {
    const { id } = user;
    return this.watchService.create(createWatchDto, id)
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() query) {
    return this.watchService.getByUser(query.user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  Update(@Body() updateWatchDto: UpdateWatchDto, @Param('id') id) {
    return this.watchService.update(updateWatchDto, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id) {
    return this.watchService.remove(id);
  }

}
