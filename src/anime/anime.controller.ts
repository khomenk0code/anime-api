import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('anime')
export class AnimeController {
  private readonly logger = new Logger(AnimeController.name);

  constructor(private readonly animeService: AnimeService) {}

  @Post()
  async create(@Body() createAnimeDto: CreateAnimeDto) {
    this.logger.log(`Creating anime: ${JSON.stringify(createAnimeDto)}`);
    return this.animeService.create(createAnimeDto);
  }

  @Get()
  async findAll(@Body() paginationDto: PaginationDto) {
    this.logger.log(
      `Fetching all anime with pagination: ${JSON.stringify(paginationDto)}`,
    );
    return this.animeService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Fetching anime with id: ${id}`);
    return this.animeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimeDto: UpdateAnimeDto,
  ) {
    this.logger.log(
      `Updating anime with id: ${id}, data: ${JSON.stringify(updateAnimeDto)}`,
    );
    return this.animeService.update(+id, updateAnimeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log(`Deleting anime with id: ${id}`);
    return this.animeService.remove(+id);
  }
}
