import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { AnimeRepository } from './anime.repository'; // Import the repository
import { Anime, AnimeSchema } from './schema/anime.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [AnimeController],
  providers: [AnimeService, AnimeRepository],
})
export class AnimeModule {}
