import { Module } from '@nestjs/common';
import { OrderSourcesService } from './order-sources.service';
import { OrderSourcesController } from './order-sources.controller';
import { OrderSource } from './entities/order-source.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderSource])],
  controllers: [OrderSourcesController],
  providers: [OrderSourcesService],
  exports: [OrderSourcesService],
})
export class OrderSourcesModule {}
