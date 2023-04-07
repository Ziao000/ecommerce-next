import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrderItemService } from '../service/order-item.service';
import { OrderItemCreateDto } from '../dto/order-item-create.dto';
import { OrderItemUpdateDto } from '../dto/order-item-update.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  getAllOrderItems() {
    return this.orderItemService.getAllOrderItems();
  }

  @Get(':id')
  getOneOrderItemById(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.getOneOrderItemById(id);
  }

  @Post()
  createOrderItem(@Body() data: OrderItemCreateDto) {
    return this.orderItemService.createOrderItem(data);
  }

  @Put(':id')
  updateOrderItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderItemUpdateDto,
  ) {
    return this.orderItemService.updateOrderItem(id, data);
  }

  @Delete(':id')
  deleteOrderItem(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.deleteOrderItem(id);
  }
}
