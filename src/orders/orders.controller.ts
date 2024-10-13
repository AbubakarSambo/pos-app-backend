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
import { OrderSourcesService } from 'src/order-sources/order-sources.service';
import { Customer } from 'src/customers/entities/customer.entity';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly customerService: CustomersService,
    private readonly orderSourceService: OrderSourcesService,
    private readonly menusService: MenusService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderType) {
    let customer: Customer;
    if (createOrderDto.customer) {
      customer = await this.customerService.findOne(createOrderDto.customer);
    }
    const orderSource = await this.orderSourceService.findOne(
      createOrderDto.orderSource,
    );

    const MenusPromises = createOrderDto.menu.map((menuItem) =>
      this.menusService.findOne(menuItem),
    );
    const menuItems = await Promise.all(MenusPromises);

    const payload = {
      customer,
      menuItems,
      orderDate: createOrderDto.orderDate,
      status: createOrderDto.status,
      orgId: createOrderDto.orgId,
      orderSource: orderSource,
      specialRequest: createOrderDto.specialRequest,
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
    let orderSource;
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
    if (updateOrderDto.orderSource) {
      orderSource = updateOrderDto.orderSource;
    }
    const payload = {
      customer,
      menuItems: menu,
      status,
      orderSource,
    };
    return this.ordersService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
