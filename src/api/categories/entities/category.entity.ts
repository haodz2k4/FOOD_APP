import { Status } from "src/constants/app.constant";
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

    @Column({
        enum: Status,
        default: Status.ACTIVE
    })
    status: Status;

    @Column({nullable: true})
    thumbnail: string;

    @DeleteDateColumn()
    deletedAt: Date;


}
