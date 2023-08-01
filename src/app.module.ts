import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { MusicsModule } from './modules/musics/musics.module';

@Module({
  imports: [UsersModule, MusicsModule],
})
export class AppModule {}
