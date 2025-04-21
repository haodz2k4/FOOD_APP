import { UserEntity } from "src/api/users/entities/user.entity";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column()
    title: string;

    @Column({nullable: true})
    description?: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[]
    
}
