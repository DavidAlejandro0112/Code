import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Album } from './album/entities/album.entity';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';



const defaultOptions = {
  type: 'postgres',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'db',
  synchronize: true,
};

@Module({

imports: [
  ConfigModule.forRoot({
    isGlobal: true, 
  }),
  TypeOrmModule.forRootAsync({
    name:'user',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('USER_DB_HOST'),
      port: +configService.get('USER_DB_PORT'),
      username: configService.get('USER_DB_USERNAME'),
      password: configService.get('USER_DB_PASSWORD'),
      database: configService.get('USER_DB_DATABASE'),
      entities: [User],
      synchronize: true,
    }),
  }),
  TypeOrmModule.forRootAsync({
    name: 'albumsConnection',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('ALBUM_DB_HOST'),
      port: +configService.get('ALBUM_DB_PORT'),
      username: configService.get('ALBUM_DB_USERNAME'),
      password: configService.get('ALBUM_DB_PASSWORD'),
      database: configService.get('ALBUM_DB_DATABASE'),
      entities: [Album],
      synchronize: true,})
    })
    ,UserModule,AlbumModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
