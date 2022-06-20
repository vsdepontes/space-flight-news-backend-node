import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ArticleDTO } from "./dto/article.dto";
import { Article } from "./entities/article.entity";
import { Model } from "mongoose";
import { ArticleAlreadyExists } from "./exceptions/article-already-exists.exception";
import { ArticleNotFound } from "./exceptions/article-not-found.exception";
import { PaginationDTO } from "./dto/pagination.dto";
import { DeleteResultDTO } from "./dto/delete-result.dto";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ) {}

  getProjectName(): string {
    return "Back-end Challenge 2021 🏅 - Space Flight News";
  }

  async getArticles(pagination: PaginationDTO) {
    const articles = await this.articleModel.find()
      .skip(pagination.offset)
      .limit(pagination.limit)
      .exec();
    return articles as Array<Article>;
  }

  async getArticle(id: number) {
    const article = await this.articleModel.findOne({ id: id }).exec();
    return article as ArticleDTO;
  }

  async postArticle(article: ArticleDTO) {
    const existingArticle = await this.articleModel.findOne({ id: article.id }).exec();
    if (existingArticle) throw new ArticleAlreadyExists();
    const createdArticle = await (new this.articleModel(article).save());
    return createdArticle as ArticleDTO;
  }

  async putArticle(id: number, article: ArticleDTO) {
    const updatedArticle = await this.articleModel
      .findOneAndUpdate({ id: id }, { $set: article }, { new: true }).exec();
    if (!updatedArticle) throw new ArticleNotFound();
    return updatedArticle as ArticleDTO;
  }

  async deleteArticle(id: number) {
    const deleteResult = await this.articleModel.deleteOne({ id: id }).exec();
    return deleteResult as DeleteResultDTO;
  }
}