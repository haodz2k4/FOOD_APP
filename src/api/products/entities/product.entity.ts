import { CategoryEntity } from "src/api/categories/entities/category.entity";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImageEntity } from "./product-image.entity";


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

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.products) 
    category: CategoryEntity;

    @Column()
    categoryId: string;
}
