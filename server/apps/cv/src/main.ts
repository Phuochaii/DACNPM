import { NestFactory } from '@nestjs/core';
import { CvModule } from './cv.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CvModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3006,
    },
  });

  await app.listen();
}
bootstrap();
