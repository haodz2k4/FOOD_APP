import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductOptionEntity } from "./product-options.entity";


@Entity("option_values")
export class OptionValueEntity extends AbstractEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @Column()
    extraPrice: number;

    @Column()
    optionId: string;

    @ManyToOne(() => ProductOptionEntity, (option) =>option.values)
    option: ProductOptionEntity

}