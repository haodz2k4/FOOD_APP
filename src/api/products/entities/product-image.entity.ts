import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";


@Entity('product_images')
export class ProductImageEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    productId: string;

    @ManyToOne(() => ProductEntity, (product) => product.images)
    product: ProductEntity

    @CreateDateColumn()
    createdAt: Date;

}