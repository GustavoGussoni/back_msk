import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Musics app')
    .setDescription('An API to listen to your collection musics')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .addTag('musics')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.enableCors({
    origin: 'http://localhost:3001',
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );
  await app.listen(3000);
}
bootstrap();
