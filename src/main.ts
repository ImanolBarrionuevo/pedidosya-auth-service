/**
 * Punto de entrada principal de la aplicación NestJS.
 * Configura CORS, aplica validaciones globales y arranca el servidor.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule); // Crea una instancia de la aplicación NestJS
    app.enableCors(); // Habilita CORS para permitir solicitudes desde otros dominios

    // Aplica validaciones globales a todos los DTOs de la aplicación
    app.useGlobalPipes(new ValidationPipe({
        transform: true, // Transforma los datos entrantes a sus tipos correspondientes
        whitelist: true, // Elimina propiedades no definidas en los DTOs
    }));

    await app.listen(process.env.PORT ?? 3001); // Inicia el servidor en el puerto especificado por la variable de entorno PORT o 3001 por defecto
}

bootstrap();