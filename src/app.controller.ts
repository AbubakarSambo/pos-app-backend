import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { DailyStatsEntity } from './app.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/daily-stats')
  getStats(
    @Query('orgId') orgId: number,
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<DailyStatsEntity> {
    return this.appService.getDailyStats(orgId, startDate, endDate);
  }
}
