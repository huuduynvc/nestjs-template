import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  message: string;
}
