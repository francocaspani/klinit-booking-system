export class CreateBookingDto {
  id: string;
  date: Date;
  clientId: string;
  services: string[];
  isCancelled: boolean;
  total: number;
  workerId: string | null;
}
