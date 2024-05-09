import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderType, UpdateOrderType } from './dto/create-order.dto';
import { CustomersService } from 'src/customers/customers.service';
import { MenusService } from 'src/menus/menus.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly customerService: CustomersService,
    private readonly menusService: MenusService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderType) {
    const customer = await this.customerService.findOne(
      createOrderDto.customer,
    );
    const MenusPromises = createOrderDto.menu.map((menuItem) =>
      this.menusService.findOne(menuItem),
    );
    const menu = await Promise.all(MenusPromises);

    const payload = {
      customer,
      menu,
      orderDate: createOrderDto.orderDate,
      status: createOrderDto.status,
      orgId: createOrderDto.orgId,
    };
    return this.ordersService.create(payload);
  }

  @Get()
  findAll(@Query('orgId') orgId: number) {
    return this.ordersService.findAll(orgId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderType,
  ) {
    let customer;
    let menu;
    let status;
    if (updateOrderDto.customer) {
      customer = await this.customerService.findOne(updateOrderDto.customer);
    }
    if (updateOrderDto?.menu?.length > 0) {
      const MenusPromises = updateOrderDto.menu.map((menuItem) =>
        this.menusService.findOne(menuItem),
      );
      menu = await Promise.all(MenusPromises);
    }
    if (updateOrderDto.status) {
      status = updateOrderDto.status;
    }
    const payload = {
      customer,
      menu,
      status,
    };
    return this.ordersService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
