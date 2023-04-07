import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
  import { OrderService } from '../service/order.service';
  import { OrderCreateDto } from '../dto/order-create.dto';
  import { OrderUpdateDto } from '../dto/order-update.dto';
  
  @Controller('orders')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Get()
    getAllOrders() {
      return this.orderService.getAllOrders();
    }

    @Get('current')
    async getCurrentOrder() {
      const currentOrder = await this.orderService.getCurrentOrder();
      return currentOrder;
    }
  
    @Get(':id')
    getOneOrderById(@Param('id', ParseIntPipe) id: number) {
      return this.orderService.getOneOrderById(id);
    }
  
    @Post()
    createOrder(@Body() data: OrderCreateDto) {
      return this.orderService.createOrder(data);
    }
  
    @Put(':id')
    updateOrder(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: OrderUpdateDto,
    ) {
      return this.orderService.updateOrder(id, data);
    }
  
    @Delete(':id')
    deleteOrder(@Param('id', ParseIntPipe) id: number) {
      return this.orderService.deleteOrder(id);
    }
  }
  