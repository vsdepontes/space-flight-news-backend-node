/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Connection, connect, Model } from "mongoose";
import { getConnectionToken, getModelToken } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./entities/article.entity";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ArticleDTOStub } from "test/stubs/article.dto.stub";
import { ArticleAlreadyExists } from "./exceptions/article-already-exists.exception";
import { UpdatedArticleDTOStub } from "test/stubs/updated-article.dto.stub";
import { ArticleNotFound } from "./exceptions/article-not-found.exception";


describe("AppController", () => {
  let appController: AppController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let articleModel: Model<Article>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    articleModel = mongoConnection.model(Article.name, ArticleSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: getConnectionToken("DatabaseConnection"), useValue: mongoConnection },
        { provide: getModelToken(Article.name), useValue: articleModel },
      ],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe("root", () => {
    it("should return \"Back-end Challenge 2021 🏅 - Space Flight News\"", () => {
      expect(appController.getProjectName()).toBe("Back-end Challenge 2021 🏅 - Space Flight News");
    });
  });

  describe("getArticles", () => {
    it("should return an array with one object", async () => {
      await (new articleModel(ArticleDTOStub()).save());
      const articles = await appController.getArticles({offset: 0, limit: 10});
      expect(articles.length === 1 && Array.isArray(articles)).toBeTruthy();
    });
    it("should return the saved object", async () => {
      await (new articleModel(ArticleDTOStub()).save());
      const articles = await appController.getArticles({offset: 0, limit: 10});
      const article = articles[0];
      expect(article.id).toBe(ArticleDTOStub().id);
    });
    it("should return an empty array", async () => {
      const articles = await appController.getArticles({offset: 0, limit: 10});
      expect(articles.length === 0 && Array.isArray(articles)).toBeTruthy();
    });
  });

  describe("getArticle", () => {
    const queryParameters = { id: ArticleDTOStub().id };

    it("should return the corresponding saved object", async () => {
      await (new articleModel(ArticleDTOStub()).save());
      const article = await appController.getArticle(queryParameters);
      expect(article.id).toBe(ArticleDTOStub().id);
    });
    it("should return null", async () => {
      const article = await appController.getArticle(queryParameters);
      expect(article).toBeNull();
    });
  });

  describe("postArticle", () => {
    it("should return the saved object", async () => {
      const createdArticle = await appController.postArticle(ArticleDTOStub());
      expect(createdArticle.id).toBe(ArticleDTOStub().id);
    });
    it("should return ArticleAlreadyExists (Bad Request - 400) exception", async () => {
      await (new articleModel(ArticleDTOStub()).save());
      await expect(appController.postArticle(ArticleDTOStub()))
        .rejects
        .toThrow(ArticleAlreadyExists);
    });
  });

  describe("putArticle", () => {
    const queryParameters = { id: UpdatedArticleDTOStub().id };

    it("should return an object with the updated title", async () => {
      await (new articleModel(ArticleDTOStub()).save());
      const updatedArticle = await appController.putArticle(queryParameters,
        UpdatedArticleDTOStub());
      expect(updatedArticle.title).toBe(UpdatedArticleDTOStub().title);
    });
    it("should return ArticleNotFound (No Content - 204) exception", async () => {
      await expect(appController.putArticle(queryParameters, UpdatedArticleDTOStub()))
        .rejects
        .toThrow(ArticleNotFound);
    });
  });

  describe("deleteArticle", () => {
    const queryParameters = { id: ArticleDTOStub().id };

    it("should return a confirmation DeleteResult", async () => {
      await (new articleModel(ArticleDTOStub()).save());
      const deleteResult = await appController.deleteArticle(queryParameters);
      expect(deleteResult.acknowledged && deleteResult.deletedCount === 1).toBeTruthy();
    });
    it("should return a DeleteResult with 0 deleted count", async () => {
      const deleteResult = await appController.deleteArticle(queryParameters);
      expect(deleteResult.acknowledged && deleteResult.deletedCount === 0).toBeTruthy();
    });
  });
});
