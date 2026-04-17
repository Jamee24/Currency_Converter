import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class ConvertDto {
  @IsString()
  from!: string;

  @IsString()
  to!: string;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsDateString()
  date?: string; // YYYY-MM-DD (if omitted → latest rates)
}