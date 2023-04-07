import { PartialType } from '@nestjs/mapped-types';
import { OrderItemCreateDto } from './order-item-create.dto';

export class OrderItemUpdateDto extends PartialType(OrderItemCreateDto) {}
