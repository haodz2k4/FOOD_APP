import { RoleEntity } from "src/api/roles/entities/role.entity";
import { Gender, Status } from "src/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { hashPassword, verifyPassword } from "src/utils/password.util";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity } from "./session.entity";
import { OrderEntity } from "src/api/orders/entities/order.entity";


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

    @Column({
        length: 36 
    })
    roleId: string;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    role: RoleEntity;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true 
    })
    gender?: Gender; 

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];

    @OneToMany(() => SessionEntity, (session) => session.user) 
    sessions: SessionEntity[];

    @BeforeUpdate()
    @BeforeInsert()
    async hashPasswordBeforeInsert() :Promise<void> {
        if(this.password) {
            this.password = await hashPassword(this.password);
        }
    }


    async isMatchPassword(yourPassword: string): Promise<boolean> {
        return verifyPassword(yourPassword, this.password)
    }
}
