import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/offset-paginated.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { OffsetPaginationDto } from 'src/common/dto/offset-pagination/offset-pagination.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionEntity } from './entities/session.entity';
import { ResponseSessionDto } from './dto/response-session.dto';
import { ConfigService } from '@nestjs/config';
import * as ms from "ms"
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity) private sessionsRepository: Repository<SessionEntity>,
    private configService: ConfigService
  ) {

  }
  
  async createSession(createSessionDto: CreateSessionDto) :Promise<ResponseSessionDto> {
    const session = await this.sessionsRepository.create({
      ...createSessionDto,
      expiresAt: new Date(Date.now() + ms(this.configService.get<ms.StringValue>('JWT_ACCESS_EXPIRES')))
    }).save();
    return plainToInstance(ResponseSessionDto, session);
    
  }

  async create(createUserDto: CreateUserDto) :Promise<ResponseUserDto> {
    const user = this.usersRepository.create(createUserDto);
    await user.save();
    return plainToInstance(ResponseUserDto, user);

  }

  async findAll(query: QueryUserDto): Promise<OffsetPaginatedDto<ResponseUserDto>> {
    const {keyword, status, gender, limit, sortBy, sortOrder} = query

    const queryBuilder = this.usersRepository
      .createQueryBuilder("user")
      .limit(limit)
      .offset(query.offset())
      .orderBy(`user.${sortBy}`,sortOrder)
    if(keyword) {
      queryBuilder.andWhere("user.fullName LIKE :keyword",{keyword: `%${keyword}%`})
    }
    if(status) {
      queryBuilder.andWhere("user.status = :status",{status})
    }
    if(gender){
      queryBuilder.andWhere("user.gender = :gender",{gender})
    }
    const [users, total] = await queryBuilder.getManyAndCount();
    const offsetPagination = new OffsetPaginationDto(total, query);
    return new OffsetPaginatedDto(plainToInstance(ResponseUserDto, users), offsetPagination)

  }

  findUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({email});
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
