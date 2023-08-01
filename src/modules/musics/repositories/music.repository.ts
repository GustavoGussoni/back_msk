import { CreateMusicDto } from '../dto/create-music.dto';
import { Music } from '../entities/music.entity';

export abstract class MusicsRepository {
  abstract create(data: CreateMusicDto): Promise<Music>;
  abstract findOne(id: string): Promise<Music | undefined>;
  abstract findAll(group: string | undefined): Promise<Music[] | object>;
}
