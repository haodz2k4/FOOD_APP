import { PermissionAction } from "src/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity('permissions')
export class PermissionEntity extends AbstractEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    action: PermissionAction;

    @Column()
    subject: string;


}