import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimeModule } from './anime/anime.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_CONNECTION_STRING');
        const logger = new Logger('MongoDB');

        logger.log(`Connecting to MongoDB: ${uri}`);

        return {
          uri,
          connectionFactory: (connection) => {
            connection.on('connected', () => logger.log('MongoDB connected'));
            connection.on('error', (err: any) =>
              logger.error(`MongoDB connection error: ${err}`),
            );
            connection.on('disconnected', () =>
              logger.warn('MongoDB disconnected'),
            );

            return connection;
          },
        };
      },
    }),
    AnimeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
