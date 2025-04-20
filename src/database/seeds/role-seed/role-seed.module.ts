import { Module } from '@nestjs/common';
import { RoleSeedService } from './role-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/api/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleSeedService]
})
export class RoleSeedModule {}
