import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class CategoryEntity extends AbstractEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    thumbnail: string;

    @DeleteDateColumn()
    deletedAt: Date;


}
