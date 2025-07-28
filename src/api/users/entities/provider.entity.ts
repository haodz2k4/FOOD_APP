import { Providers } from "src/constants/app.constant";
import { AbstractEntity } from "src/database/entities/abstracts.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('providers')
export class ProviderEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({
        type: 'enum',
        enum: Providers
    })
    provider: Providers;

    @Column()
    providerId: string;

}