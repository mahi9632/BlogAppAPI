import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: '*',
    credentials: true,
  });


  app.useGlobalGuards(new JwtAuthGuard())


  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: { host: 'localhost', port: 3003 },
  // });

  // Start all microservices
  // await app.startAllMicroservices();

  //swagger Config
  const config = new DocumentBuilder()
    .setTitle('BlogApp example')
    .setDescription('The BlogApp API description')
    .setVersion('1.0')
    .addTag('BlogApp')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, documentFactory);


  // Start the main application
  await app.listen(8080);
}

bootstrap();
