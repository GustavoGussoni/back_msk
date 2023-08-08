import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('musics')
@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMusicDto: CreateMusicDto, @Request() req) {
    return this.musicsService.create(createMusicDto, req.user.id);
  }

  @Get('')
  @ApiQuery({
    name: 'group',
    type: String,
    required: false,
    description:
      'Informe artist, genre ou album para obter pesquisar agrupada.',
  })
  findAll(@Query('group') group: string | undefined) {
    return this.musicsService.findAll(group);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicsService.update(id, updateMusicDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.musicsService.remove(id);
  }

  @Patch('upload/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover_image', maxCount: 1 },
      { name: 'music', maxCount: 1 },
    ]),
  )
  upload(
    @UploadedFiles()
    files: {
      cover_image?: Express.Multer.File[];
      music?: Express.Multer.File[];
    },
    @Param('id') id: string,
  ) {
    const { cover_image, music } = files;
    return this.musicsService.upload(cover_image[0], music[0], id);
  }
}
