import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class BaseQueryDto {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  pageIndex: number = 1;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  pageSize: number = 10;

  get offset(): number {
    return (this.pageIndex - 1) * this.pageSize;
  }

  get limit(): number {
    return this.pageSize;
  }
}
