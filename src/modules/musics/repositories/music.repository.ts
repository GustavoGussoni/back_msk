import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { Music } from '../entities/music.entity';

export abstract class MusicsRepository {
  abstract create(data: CreateMusicDto, userId: string): Promise<Music>;
  abstract findOne(id: string): Promise<Music | undefined>;
  abstract findAll(group: string | undefined): Promise<Music[] | object>;
  abstract update(data: UpdateMusicDto, musicId: string): Promise<Music>;
}
