import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { Message } from 'src/decorators/message.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Message("Create user success")
  create(@Body() createUserDto: CreateUserDto) :Promise<ResponseUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Message("Find user by id")
  findOne(@Param('id') id: string) :Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Message("Update user by id")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) :Promise<ResponseUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Message('Soft remove success')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string):Promise<void> {
    return this.usersService.remove(id);
  }
}
