import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateAnimeDto {
  @IsNotEmpty({ message: 'Average score is required' })
  @IsNumber({}, { message: 'Average score must be a number' })
  @Min(0, { message: 'Average score cannot be less than 0' })
  @Max(100, { message: 'Average score cannot be more than 100' })
  @IsOptional()
  averageScore?: number;

  @IsOptional()
  @IsString({ message: 'Cover image must be a string URL' })
  coverImage?: string;

  @IsNotEmpty({ message: 'ID is required' })
  @IsNumber({}, { message: 'ID must be a number' })
  id: number;

  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;

  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating cannot be less than 0' })
  @Max(10, { message: 'Rating cannot be more than 10' })
  rating?: number;

  @IsOptional()
  @IsString({ message: 'Added by must be a string' })
  addedBy?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;
}
