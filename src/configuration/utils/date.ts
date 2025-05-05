import dayjs, { type Dayjs, type ManipulateType } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export interface DateHandlerInterface {
  toISOString(): string;
  toUnix(): number;
  add(amount: number, unit: ManipulateType): DateHandlerInterface;
  subtract(amount: number, unit: ManipulateType): DateHandlerInterface;
  format(formatString: string): string;
  toDate(): Date;
}

class DateHandler implements DateHandlerInterface {
  private date: Dayjs;

  constructor(dateInput?: string | number | Date) {
    this.date = dateInput ? dayjs.utc(dateInput) : dayjs.utc();
  }

  static now(): DateHandler {
    return new DateHandler();
  }

  static from(dateInput: string | number | Date): DateHandler {
    return new DateHandler(dateInput);
  }

  toISOString(): string {
    return this.date.toISOString();
  }

  toUnix(): number {
    return this.date.unix();
  }

  add(amount: number, unit: ManipulateType): DateHandler {
    this.date = this.date.add(amount, unit);
    return this;
  }

  subtract(amount: number, unit: ManipulateType): DateHandler {
    this.date = this.date.subtract(amount, unit);
    return this;
  }

  format(formatString: string): string {
    return this.date.format(formatString);
  }

  toDate(): Date {
    return this.date.toDate();
  }
}

export const DateInstance = {
  now: (): DateHandler => DateHandler.now(),
  from: (dateInput: string | number | Date): DateHandler => DateHandler.from(dateInput),
};
