import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

const swaggerDescription = `
  This API is used to retrieve hardware specific information about the system, where its installed. It is used in 
  conjunction with the OwlSpect App, but it can also be free used for custom applications.
`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('OwlSpect REST API')
    .setDescription(swaggerDescription)
    .setVersion('1.0')
    .setContact('Dominique Börner', 'https://dominiqueboerner.me', '')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}

bootstrap();
