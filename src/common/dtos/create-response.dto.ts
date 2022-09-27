import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateResponseDto {
  @Expose()
  id!: string;
}
