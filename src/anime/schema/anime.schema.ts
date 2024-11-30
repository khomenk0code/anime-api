import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnimeDocument = Anime & Document;

@Schema({ timestamps: true })
export class Anime {
  @Prop()
  averageScore: number;

  @Prop()
  coverImage: string;

  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  comment: string;

  @Prop()
  title: string;

  @Prop()
  rating: number;

  @Prop()
  addedBy: string;

  @Prop()
  status: string;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
