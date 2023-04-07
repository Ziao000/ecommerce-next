import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { FindOneOptions } from 'typeorm';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders() {
    const query = await this.orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.items', 'items')
    .leftJoinAndSelect('items.product', 'product')
    .getMany()
    return query;
  }

  async createOrder(data: OrderCreateDto) {
    try {
      return this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating order');
    }
  }

  async getOneOrderById(id: number) {
    return await this.orderRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async getCurrentOrder(): Promise<Order> {
    // Récupération de la commande en cours
    let currentOrder = await this.orderRepository.findOne({ where: { status: 'in_progress' } });

    // Si aucune commande en cours n'existe, en créer une nouvelle
    if (!currentOrder) {
      currentOrder = this.orderRepository.create({ status: 'in_progress' });
      await this.orderRepository.save(currentOrder);
    }

    return currentOrder;
  }

  async updateOrder(id: number, data: OrderUpdateDto) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }
    const orderUpdate = { ...order, ...data };
    await this.orderRepository.save(orderUpdate);
    return orderUpdate;
  }

  async deleteOrder(id: number) {
    return await this.orderRepository.delete(id);
  }
}
