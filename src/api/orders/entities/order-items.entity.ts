import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "src/api/products/entities/product.entity";

@Entity('order_items')
export class OrderItemEntity extends AbstractEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => OrderEntity, (order) => order.items)
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, (product) => product.orders)
    product: ProductEntity;

}