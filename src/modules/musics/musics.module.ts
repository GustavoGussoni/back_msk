import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicsRepository } from './repositories/music.repository';
import { MusicsInMemoryRepository } from './repositories/in-memory/musics.in-memory.repository';

@Module({
  controllers: [MusicsController],
  providers: [
    MusicsService,
    {
      provide: MusicsRepository,
      useClass: MusicsInMemoryRepository,
    },
  ],
})
export class MusicsModule {}
