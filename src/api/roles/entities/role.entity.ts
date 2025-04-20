import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column()
    title: string;

    @Column({nullable: true})
    description?: string;
    
}
