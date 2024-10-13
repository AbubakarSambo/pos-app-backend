export class CreateBookingDto {
  title: string;
  start: Date;
  end: Date;
  orgId: number;
  confirmed?: boolean; // Optional in case the booking isn't confirmed when created
}
