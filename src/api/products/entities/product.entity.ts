import { CategoryEntity } from "src/api/categories/entities/category.entity";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImageEntity } from "./product-image.entity";
import { ProductOptionEntity } from "./product-options.entity";
import { OrderItemEntity } from "src/api/orders/entities/order-items.entity";
import { CartItemEntity } from "src/api/cart/entities/cart-item.entity";


@Entity('products')
export class ProductEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    thumbnail: string;

    @Column()
    price: number;

    @OneToMany(() => ProductImageEntity, (img) => img.product)
    images: ProductImageEntity[]

    @Column()
    discountPercentage: number;

    @OneToMany(() => ProductOptionEntity, (options) => options.product)
    options: ProductOptionEntity[];

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.products) 
    category: CategoryEntity;

    @Column()
    categoryId: string;
 
    @OneToMany(() => OrderItemEntity, (items) => items.product)
    orders: OrderItemEntity[];

    @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
    cartItems: CartItemEntity[];
}
