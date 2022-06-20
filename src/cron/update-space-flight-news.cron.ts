import { Cron, Timeout } from "@nestjs/schedule";
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app.service";
import { SpaceFlightNewsQueryParameters } from "src/models/space-flight-news-query-parameters.model";
import { ArticleDTO } from "src/dto/article.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Article } from "../entities/article.entity";
import { Model } from "mongoose";

@Injectable()
export class UpdateSpaceFlightNews {
  private readonly spaceFlightNewsApiBaseUrl = "https://api.spaceflightnewsapi.net/v3/articles";
  private readonly logger = new Logger(UpdateSpaceFlightNews.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly AppService: AppService,
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  //@Timeout(1000)
  @Cron("0 0 9 * * *")
  async importArticles() {
    const queryParams = new SpaceFlightNewsQueryParameters();
    queryParams._sort = "publishedAt:ASC";
    queryParams._limit = 100;
    queryParams._start = 0;
    const lastSavedArticle = await this.getLastSavedArticle();
    if (lastSavedArticle) {
      // eslint-disable-next-line camelcase
      queryParams.publishedAt_gt = lastSavedArticle.publishedAt;
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const articles = await this.getArticlesArray(queryParams);
      if (!articles?.length) break;
      await this.saveArticles(articles);
      queryParams._start += queryParams._limit;
    }
  }

  async getArticlesArray(parameters: SpaceFlightNewsQueryParameters) {
    const request = this.httpService.get(this.spaceFlightNewsApiBaseUrl, { params: parameters });
    let articlesArray: Array<ArticleDTO>;
    try {
      articlesArray = (await (await firstValueFrom(request)).data) as Array<ArticleDTO>;
    } catch (error) {
      this.logger.error("Error sending the request to the Space Flight News API\n" + error);
    }
    return articlesArray;
  }

  async saveArticles(articles: Array<ArticleDTO>) {
    try {
      for (const article of articles) await this.AppService.postArticle(article);
    } catch (error) {
      this.logger.error("Error saving the articles to the database\n" + error);
      return;
    }
  }

  async getLastSavedArticle() {
    const article = await this.articleModel.findOne().sort({ publishedAt: -1 })
      .select("publishedAt").exec();
    return article as ArticleDTO;
  }
}