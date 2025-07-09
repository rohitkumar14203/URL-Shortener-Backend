import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://example.com',
    description: 'Original URL to shorten',
  })
  originalUrl: string;
}
