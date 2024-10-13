import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
  ) {}

  create(createBookingDto: CreateBookingDto, orgId: number): Promise<Booking> {
    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      orgId,
    });
    return this.bookingsRepository.save(booking);
  }

  findAll(skip = 0, take = 100, orgId: number): Promise<Booking[]> {
    return this.bookingsRepository.find({
      skip,
      take,
      where: { orgId },
    });
  }

  findOne(id: number): Promise<Booking> {
    return this.bookingsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    await this.bookingsRepository.update(id, updateBookingDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bookingsRepository.delete(id);
  }
}
