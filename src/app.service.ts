import { Injectable } from '@nestjs/common';
import { OrdersService } from './orders/orders.service';
import { DailyStatsEntity } from './app.entity';

@Injectable()
export class AppService {
  constructor(private ordersService: OrdersService) {}
  async getDailyStats(
    orgId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<DailyStatsEntity> {
    const stats = [0, 0, 0, 0, 0, 0, 0] as DailyStatsEntity;
    const { defaultStartDate, defaultEndDate } = getCurrentWeekDates();
    console.log({ startDate, endDate });

    const orders = await this.ordersService.findAllItemsInWeek(
      startDate ? new Date(startDate) : defaultStartDate,
      endDate ? new Date(endDate) : defaultEndDate,
      orgId,
    );
    orders.forEach((order) => {
      const orderDay = new Date(order.orderDate).getDay();
      const orderTotal = order.menuItems.reduce(
        (accumulator, currentValue) => Number(currentValue.price) + accumulator,
        0,
      );
      stats[orderDay] = stats[orderDay] += orderTotal;
    });
    return stats;
  }
}

function getCurrentWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate start date
  const defaultStartDate = new Date(today); // Clone the current date
  defaultStartDate.setDate(today.getDate() - dayOfWeek); // Set to the first day of the week (Sunday)
  defaultStartDate.setHours(0, 1, 0, 0); // Set time to 12:01 am (00:01)

  // Calculate end date
  const defaultEndDate = new Date(today); // Clone the current date
  defaultEndDate.setDate(today.getDate() + (6 - dayOfWeek)); // Set to the last day of the week (Saturday)
  defaultEndDate.setHours(23, 59, 59, 999); // Set time to 11:59:59.999 pm

  return { defaultStartDate, defaultEndDate };
}
