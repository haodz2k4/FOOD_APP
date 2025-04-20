import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";



export abstract class AbstractEntity extends BaseEntity {

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}