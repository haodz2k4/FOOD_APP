import { ProductEntity } from "src/api/products/entities/product.entity";
import { Status } from "src/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status;

    @Column({nullable: true})
    thumbnail: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => ProductEntity, (products) => products.category)
    products: ProductEntity[];
}
