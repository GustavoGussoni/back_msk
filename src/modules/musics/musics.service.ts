import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './repositories/music.repository';

@Injectable()
export class MusicsService {
  constructor(private musicRepository: MusicsRepository) {}

  async create(createMusicDto: CreateMusicDto, userId: string) {
    const createMusic = await this.musicRepository.create(
      createMusicDto,
      userId,
    );
    return createMusic;
  }

  async findAll(group: string | undefined) {
    return this.musicRepository.findAll(group);
  }

  async findOne(id: string) {
    const findMusic = await this.musicRepository.findOne(id);

    // if (!findMusic) throw new NotFoundException('Music not found!');

    return findMusic;
  }

  async update(id: string, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  async remove(id: string) {
    return `This action removes a #${id} music`;
  }
}
