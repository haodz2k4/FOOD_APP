import { UserEntity } from "src/api/users/entities/user.entity";
import { OrderStatus } from "src/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders")
export class OrderEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus;

    @Column()
    address: string;

    @Column({nullable: true})
    notes: string;

    @Column()
    userId: string;

    @ManyToOne(() => UserEntity, user => user.orders)
    user: UserEntity;
}
