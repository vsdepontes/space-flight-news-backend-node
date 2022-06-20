import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  const options = new DocumentBuilder()
    .setTitle("Back-end Challenge 2021 🏅 - Space Flight News")
    .setDescription("Back-end Challenge 2021 🏅 - Space Flight News API")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  const defaultPort = 3000;
  await app.listen(process.env.PORT || defaultPort);
}
bootstrap();
