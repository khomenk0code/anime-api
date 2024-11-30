import { Injectable, Logger } from '@nestjs/common';
import { AnimeRepository } from './anime.repository';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Anime } from './schema/anime.schema';

@Injectable()
export class AnimeService {
  private readonly logger = new Logger(AnimeService.name);

  constructor(private readonly animeRepository: AnimeRepository) {}

  async create(createAnimeDto: CreateAnimeDto): Promise<Anime> {
    this.logger.log(`Service: Creating anime`);
    return this.animeRepository.create(createAnimeDto);
  }

  async findAll(paginationDto: PaginationDto): Promise<{
    data: Anime[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    this.logger.log(`Service: Fetching all anime with pagination`);
    return this.animeRepository.findAll(paginationDto);
  }

  async findOne(id: number): Promise<Anime> {
    this.logger.log(`Service: Fetching anime with id ${id}`);
    return this.animeRepository.findOne(id);
  }

  async update(id: number, updateAnimeDto: UpdateAnimeDto): Promise<Anime> {
    this.logger.log(`Service: Updating anime with id ${id}`);
    return this.animeRepository.update(id, updateAnimeDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    this.logger.log(`Service: Deleting anime with id ${id}`);
    await this.animeRepository.remove(id);
    return { message: 'Anime deleted successfully' };
  }
}
