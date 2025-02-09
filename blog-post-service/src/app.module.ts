import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsModule } from "./posts/posts.module";
import { PostsController } from "./posts/posts.controller";
import { PostsService } from "./posts/posts.service";

@Module({
  imports: [    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([]),
    PostsModule,PostsModule],
  controllers: [AppController,PostsController],
  providers: [AppService,PostsService],
})
export class AppModule {}
