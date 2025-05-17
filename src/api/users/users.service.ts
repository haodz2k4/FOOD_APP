import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
