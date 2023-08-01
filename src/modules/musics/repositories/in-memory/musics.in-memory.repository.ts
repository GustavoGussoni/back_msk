import { Injectable } from '@nestjs/common';
import { MusicsRepository } from '../music.repository';
import { CreateMusicDto } from '../../dto/create-music.dto';
import { Music } from '../../entities/music.entity';

@Injectable()
export class MusicsInMemoryRepository implements MusicsRepository {
  private database: Music[] = [];

  async create(data: CreateMusicDto): Promise<Music> {
    const newMusic = new Music();
    Object.assign(newMusic, { ...data });

    this.database.push(newMusic);

    return newMusic;
  }

  async findOne(id: string): Promise<Music> {
    const music = this.database.find((music) => music.id === id);
    return music;
  }

  private groupBy(musics: Music[], key: string) {
    return musics.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);

      return acc;
    }, {});
  }

  async findAll(group: string): Promise<object | Music[]> {
    if (group) {
      return this.groupBy(this.database, group);
    }
    return this.database;
  }
}
