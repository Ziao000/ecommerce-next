import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCreateDto } from '../dto/user-create.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { Order } from '../../order/entity/order.entity';
import { FindOneOptions } from 'typeorm';
``


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({
      relations: ['orders'],
    });
  }

  async createUser(data: UserCreateDto) {
    try {
      return this.userRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }

  async getOneUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async updateUser(id: number, data: UserUpdateDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    const userUpdate = { ...user, ...data };
    await this.userRepository.save(userUpdate);

    return userUpdate;
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }

  async getUserOrders(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
    return user.orders;
  }

  async addUserOrder(userId: number, orderId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
  
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });
  
    user.orders.push(order);
    await this.userRepository.save(user);
    return user;
  }
  

  async removeUserOrder(userId: number, orderId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
    user.orders = user.orders.filter((order) => order.id !== orderId);
    await this.userRepository.save(user);
    return user;
  }
}
