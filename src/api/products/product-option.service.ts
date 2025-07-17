import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductOptionEntity } from "./entities/product-options.entity";
import { Repository } from "typeorm";
import { OptionValueEntity } from "./entities/option_value.entity";
import { CreateOptionDto } from "./dto/create-option.dto";



@Injectable()
export class ProductOptionService {

    constructor(
        @InjectRepository(ProductOptionEntity) private productOptionsRepository: Repository<ProductOptionEntity>,
        @InjectRepository(OptionValueEntity) private optionValuesRepositry: Repository<OptionValueEntity>
    ) {}

    async create(productId: string, options: CreateOptionDto[]) {
        for (const opt of options) {
            const option = this.productOptionsRepository.create({
                name: opt.name,
                productId,
            });
            await this.productOptionsRepository.save(option);

            const values = opt.values.map((v) =>
                this.optionValuesRepositry.create({
                value: v.value,
                extraPrice: v.extraPrice,
                option,
                }),
            );
            await this.optionValuesRepositry.save(values);

            option.values = values;
        }
    }
}