import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOneUserById(id);
  }

  @Post()
  createUser(@Body() data: UserCreateDto) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDto) {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
