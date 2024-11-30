import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime, AnimeDocument } from './schema/anime.schema';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class AnimeRepository {
  private readonly logger = new Logger(AnimeRepository.name);

  constructor(
    @InjectModel(Anime.name) private readonly animeModel: Model<AnimeDocument>,
  ) {}

  async create(createAnimeDto: CreateAnimeDto): Promise<Anime> {
    try {
      this.logger.log(
        `Attempting to create anime: ${JSON.stringify(createAnimeDto)}`,
      );
      const createdAnime = new this.animeModel(createAnimeDto);
      return await createdAnime.save();
    } catch (error) {
      this.logger.error(
        `Error creating anime record: ${error.message}`,
        error.stack,
      );

      if (error.code === 11000) {
        throw new ConflictException('Anime with this id already exists');
      }

      throw new InternalServerErrorException('Failed to create anime record');
    }
  }

  async findAll(
    paginationDto: PaginationDto,
    sortBy: string = 'rating',
    order: 'asc' | 'desc' = 'desc',
  ): Promise<Anime[]> {
    const { limit, offset } = paginationDto;
    try {
      const sortOrder = order === 'asc' ? 1 : -1;
      const animeList = await this.animeModel
        .find()
        .sort({ [sortBy]: sortOrder })
        .skip(offset)
        .limit(limit)
        .exec();

      if (!animeList || animeList.length === 0) {
        throw new NotFoundException('No anime records found');
      }

      return animeList;
    } catch (error) {
      this.logger.error(
        `Error fetching anime list: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to fetch anime records');
    }
  }

  async findOne(id: number): Promise<Anime> {
    try {
      const anime = await this.animeModel.findOne({ id }).exec();
      if (!anime) {
        throw new NotFoundException(`Anime with id ${id} not found`);
      }
      return anime;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch anime with id ${id}`,
        error.message,
      );
    }
  }

  async update(id: number, updateAnimeDto: UpdateAnimeDto): Promise<Anime> {
    try {
      const updatedAnime = await this.animeModel
        .findOneAndUpdate({ id }, updateAnimeDto, { new: true })
        .exec();
      if (!updatedAnime) {
        throw new NotFoundException(`Anime with id ${id} not found`);
      }
      return updatedAnime;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update anime with id ${id}`,
        error.message,
      );
    }
  }

  async remove(id: number): Promise<Anime> {
    try {
      const deletedAnime = await this.animeModel
        .findOneAndDelete({ id })
        .exec();
      if (!deletedAnime) {
        throw new NotFoundException(`Anime with id ${id} not found`);
      }
      return deletedAnime;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete anime with id ${id}`,
        error.message,
      );
    }
  }
}
