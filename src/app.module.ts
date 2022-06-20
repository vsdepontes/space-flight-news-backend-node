import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Article, ArticleSchema } from "./entities/article.entity";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { UpdateSpaceFlightNews } from "./cron/update-space-flight-news.cron";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Article.name,
      schema: ArticleSchema,
    }]),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UpdateSpaceFlightNews,
  ],
})
export class AppModule {}
