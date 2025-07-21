import { OrderEntity } from "src/api/orders/entities/order.entity";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('restaurant')
export class RestaurantEntity extends AbstractEntity{

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @DeleteDateColumn()
    deketedAt: Date;

    @OneToMany(() => OrderEntity, order => order.restaurant)
    orders: OrderEntity[];
    
}
