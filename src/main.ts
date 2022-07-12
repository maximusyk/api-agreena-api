import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';

const PORT = process.env.APP_PORT || 5000;

async function start() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));

    const configService = app.get(ConfigService);

    const swaggerConfig = new DocumentBuilder()
    .setTitle('Agreena API')
    .setVersion('1.0')
    .addServer(
        'http://localhost:' + configService.get('APP_PORT'),
        'Agreena Local',
    )
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('/api/docs', app, document);

    writeFileSync('swagger.json', JSON.stringify(document), { encoding: 'utf8' });

    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();