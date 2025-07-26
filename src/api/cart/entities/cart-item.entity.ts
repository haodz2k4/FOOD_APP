import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./cart.entity";
import { ProductEntity } from "src/api/products/entities/product.entity";



@Entity('CartItems')
export class CartItemEntity extends AbstractEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => CartEntity,(cart) => cart.items )
    cart: CartEntity;

    @ManyToOne(() => ProductEntity, (product) => product.cartItems)
    product: ProductEntity;
}