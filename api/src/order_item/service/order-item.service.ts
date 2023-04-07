import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entity/order-item.entity';
import { OrderItemCreateDto } from '../dto/order-item-create.dto';
import { OrderItemUpdateDto } from '../dto/order-item-update.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async getAllOrderItems() {
    const query = await this.orderItemRepository
    .createQueryBuilder('orderItems')
    .leftJoinAndSelect('orderItems.product', 'product')
    .getMany()
    return query;
  }

  async createOrderItem(data: OrderItemCreateDto) {
    try {
      return this.orderItemRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order item');
    }
  }

  async getOneOrderItemById(id: number) {
    return await this.orderItemRepository.findOne({ where: { id } });
  }

  async updateOrderItem(id: number, data: OrderItemUpdateDto) {
    const orderItem = await this.orderItemRepository.findOne({ where: { id } });
    if (!orderItem) {
      throw new Error('Order item not found');
    }
    const orderItemUpdate = { ...orderItem, ...data };
    await this.orderItemRepository.save(orderItemUpdate);
    return orderItemUpdate;
  }

  async deleteOrderItem(id: number) {
    return await this.orderItemRepository.delete(id);
  }
}
