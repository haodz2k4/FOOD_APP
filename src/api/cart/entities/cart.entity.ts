import { UserEntity } from "src/api/users/entities/user.entity";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";

@Entity('Carts')
export class CartEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;


    @OneToOne(() => UserEntity, (user) => user.cart) 
    user: UserEntity

    @OneToMany(() => CartItemEntity, (items) => items.cart)
    items: CartItemEntity[];

}
