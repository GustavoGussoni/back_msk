import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMusicDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  album: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cover_image: string | null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  music_url: string | null;
}
