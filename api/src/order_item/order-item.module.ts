import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { OrderController } from '../order/controller/order.controller';
import { OrderItemController } from './controller/order-item.controller';
import { OrderService } from '../order/service/order.service';
import { OrderItemService } from './service/order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController, OrderItemController],
  providers: [OrderService, OrderItemService],
})
export class OrderItemModule {}
