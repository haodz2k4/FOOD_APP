import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/api/roles/entities/role.entity';
import { Role } from 'src/constants/role.constant';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService implements OnModuleInit {
 
    constructor(
        @InjectRepository(RoleEntity) 
        private rolesRepository: Repository<RoleEntity>
    ) {}
    async onModuleInit() :Promise<void> {
        const roleAdmin = await this.rolesRepository.exists({where: {title: Role.ADMIN}});
        if(!roleAdmin) {
            const admin = this.rolesRepository.create({title: Role.ADMIN});
            await admin.save();
        }   

        const roleUser = await this.rolesRepository.exists({where: {title: Role.USER}});
        if(!roleUser) {
            const role = this.rolesRepository.create({title: Role.USER});
            await role.save();
        }
    }


}
