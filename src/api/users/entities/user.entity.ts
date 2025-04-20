import { Gender } from "src/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100})
    fullName: string;

    @Column({nullable: true})
    avatar?: string;

    @Column({
        unique: true,
        length: 100 
    })
    email: string;

    @Column({nullable: true})
    password?: string;

    @Column({
        nullable: true,
        length: 50 
    })
    phone?: string;

    // @Column({
    //     type: 'int'
    // })
    // roleId: number;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true 
    })
    gender?: Gender; 

    @DeleteDateColumn()
    deletedAt?: Date;

}
