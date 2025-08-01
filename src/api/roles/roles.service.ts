import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/constants/role.constant';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>
  ) {}

  findRoleByName(name: Role) {
    return this.rolesRepository.findOneBy({title: name})
  }

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    return await  this.rolesRepository
    .createQueryBuilder('role')
    .getMany()
  }

  async findOne(id: string) {
    const role = await this.rolesRepository.findOneBy({id});
    if(!role) {
      throw new NotFoundException("Role is not found")
    }
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
