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
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() createMusicDto: CreateMusicDto, @Request() req) {
    console.log(req.user);
    return this.musicsService.create(createMusicDto, req.user.id);
  }

  @Get('')
  findAll(@Query('group') group: string | undefined) {
    return this.musicsService.findAll(group);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }

  // @Patch('id')
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
  //   return this.musicsService.update(id, updateMusicDto);
  // }

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

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.musicsService.remove(id);
  // }
}
