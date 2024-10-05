import { Controller, Get, Post, Patch, Delete, Param, Body, BadRequestException } from '@nestjs/common'; // Add BadRequestException

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userId = Number(id);

    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID'); // Exception handling
    }

    return this.userService.getUserById(userId);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = Number(id);

    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID'); // Exception handling for invalid ID
    }

    return this.userService.updateUser(userId, updateUserDto); // Call service to update the user
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userId = Number(id);

    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID'); // Exception handling
    }

    return this.userService.deleteUser(userId);
  }
}
