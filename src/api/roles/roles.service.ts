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
  const roles = [
    {
      title: 'admin',
      permissions: [
        'user_read',
        'user_write',
        'user_delete',
        'order_read',
        'order_update',
        'order_delete',
        'product_create',
        'product_update',
        'product_delete',
        'category_manage',
        'report_view',
        'dashboard_access',
        'analytics_view',
        'settings_update',
        'role_manage',
        'permission_assign',
        'notification_send',
        'email_manage',
        'backup_access',
        'log_view',
        'system_monitor',
      ],
    },
    {
      title: 'user',
      permissions: [], // hoặc không có trường này luôn cũng được
    }
  ];

  return roles;
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
