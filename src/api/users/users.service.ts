import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity> ) {

  }
  
  async create(createUserDto: CreateUserDto) :Promise<ResponseUserDto> {
    const user = this.usersRepository.create(createUserDto);
    await user.save();
    return plainToInstance(ResponseUserDto, user);

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) :Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOneBy({id});
    if(!user) {
      throw new NotFoundException("User is not found");
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) :Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOneBy({id});
    if(!user) {
      throw new NotFoundException("User is not found");
    }
    Object.assign(user, updateUserDto);
    await user.save();
    return plainToInstance(ResponseUserDto, user);
  }

  async remove(id: string) :Promise<void> {
    await this.findOne(id);
    await this.usersRepository.softDelete(id);
  }
}
