import { PartialType } from '@nestjs/mapped-types';
import { CreateStatiticDto } from './create-statitic.dto';

export class UpdateStatiticDto extends PartialType(CreateStatiticDto) {}
