import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { Message } from 'src/decorators/message.decorator';
import { QueryUserDto } from './dto/query-user.dto';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/offset-paginated.dto';
import { User } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  currentUser(@User('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }
  
  @Post()
  @Message("Create user success")
  create(@Body() createUserDto: CreateUserDto) :Promise<ResponseUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Message("Get many users")
  findAll(@Query() queryUserDto: QueryUserDto): Promise<OffsetPaginatedDto<ResponseUserDto>> {
    return this.usersService.findAll(queryUserDto);
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
