import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    discountPercentage: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
