import { Injectable } from '@nestjs/common';
import { MusicsRepository } from '../music.repository';
import { CreateMusicDto } from '../../dto/create-music.dto';
import { Music } from '../../entities/music.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MusicsPrismaRepository implements MusicsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMusicDto, userId: string): Promise<Music> {
    const music = new Music();
    Object.assign(music, { ...data });

    const newMusic = await this.prisma.music.create({
      data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        name: music.name,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId,
      },
    });

    return newMusic;
  }

  async findOne(id: string): Promise<Music> {
    const music = await this.prisma.music.findUnique({ where: { id } });
    return music;
  }

  private groupBy(musics: Music[], key: string) {
    return musics.reduce((acc, cur) => {
      (acc[cur[key]] = acc[cur[key]] || []).push(cur);

      return acc;
    }, {});
  }

  async findAll(group: string): Promise<object | Music[]> {
    const musics = await this.prisma.music.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (group) {
      return this.groupBy(musics, group);
    }

    return musics;
  }
}