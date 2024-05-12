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
import { OrderSourcesService } from './order-sources.service';
import { CreateOrderSourceDto } from './dto/create-order-source.dto';
import { UpdateOrderSourceDto } from './dto/update-order-source.dto';

@Controller('order-sources')
export class OrderSourcesController {
  constructor(private readonly orderSourcesService: OrderSourcesService) {}

  @Post()
  create(@Body() createOrderSourceDto: CreateOrderSourceDto) {
    return this.orderSourcesService.create(createOrderSourceDto);
  }

  @Get()
  findAll(@Query('orgId') orgId: number) {
    return this.orderSourcesService.findAll(orgId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderSourcesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderSourceDto: UpdateOrderSourceDto,
  ) {
    return this.orderSourcesService.update(+id, updateOrderSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderSourcesService.remove(+id);
  }
}
