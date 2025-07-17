import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { OptionValueEntity } from "./option_value.entity";



@Entity('product_options')
export class ProductOptionEntity extends AbstractEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    productId: string;

    @ManyToOne(() => ProductEntity, (product) => product.options)
    product: ProductEntity;

    @OneToMany(() => OptionValueEntity, (value) => value.option)
    values: OptionValueEntity[]
    
}