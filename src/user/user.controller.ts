import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { WatchService } from '../watch/watch.service';


@ApiBearerAuth() @ApiUseTags('user')

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly watchService: WatchService
  ) { }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param() params) {
    return this.userService.get(params.id);
  }

  @Get(':id/watches')
  @UseGuards(AuthGuard())
  findByUser(@Param() params) {
    return this.watchService.getByUser(params.id);
  }

}
