import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POSTS_SERVICE',
        transport: Transport.TCP,
        options: { host: process.env.APP_HOST, port: 8081 },
      },
    ]),
  ],
  controllers: [PostsController],
  exports: [ClientsModule],
})
export class PostsModule {}
