import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicsRepository } from './repositories/music.repository';
import { MusicsInMemoryRepository } from './repositories/in-memory/musics.in-memory.repository';
import { PrismaService } from 'src/database/prisma.service';
import { MusicsPrismaRepository } from './repositories/prisma/musics-prisma.repository';

@Module({
  controllers: [MusicsController],
  providers: [
    MusicsService,
    PrismaService,
    {
      provide: MusicsRepository,
      useClass: MusicsPrismaRepository,
    },
  ],
})
export class MusicsModule {}
