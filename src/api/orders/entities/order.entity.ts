import { RestaurantEntity } from "src/api/restaurants/entities/restaurant.entity";
import { UserEntity } from "src/api/users/entities/user.entity";
import { OrderStatus, PaymentMethod } from "src/constants/app.constant";
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

    @Column({enum: PaymentMethod, default: PaymentMethod.COD})
    paymentMethod: PaymentMethod;;

    @Column()
    restaurantId: string;

    @ManyToOne(() => UserEntity, restaurant => restaurant.orders)
    restaurant: RestaurantEntity;
}
