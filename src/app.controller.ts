import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiNoContentResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { ArticleDTO } from "./dto/article.dto";
import { PaginationDTO } from "./dto/pagination.dto";
import { ArticleAlreadyExists } from "./exceptions/article-already-exists.exception";
import { ArticleNotFound } from "./exceptions/article-not-found.exception";
import { SearchIdDTO } from "./dto/search-id.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags("Root")
  @ApiOperation({
    summary: "Gets the project name",
    description: "Gets the project name",
  })
  getProjectName(): string {
    return this.appService.getProjectName();
  }

  @Get("articles")
  @ApiTags("Articles")
  @ApiOperation({
    summary: "Gets the articles using pagination",
    description: "Gets the articles using pagination",
  })
  getArticles(@Query() pagination: PaginationDTO) {
    return this.appService.getArticles(pagination);
  }

  @Get("articles/:id")
  @ApiTags("Articles")
  @ApiOperation({
    summary: "Gets an article by id",
    description: "Gets an article by id",
  })
  getArticle(@Param() parameters: SearchIdDTO) {
    return this.appService.getArticle(parameters.id);
  }

  @Post("articles")
  @ApiTags("Articles")
  @ApiOperation({
    summary: "Saves an article",
    description: "Saves an article",
  })
  @ApiBadRequestResponse({ description: new ArticleAlreadyExists().message })
  postArticle(@Body() article: ArticleDTO) {
    return this.appService.postArticle(article);
  }

  @Put("articles/:id")
  @ApiTags("Articles")
  @ApiOperation({
    summary: "Updates an article",
    description: "Updates an article",
  })
  @ApiNoContentResponse({ description: new ArticleNotFound().message })
  putArticle(@Param() parameters: SearchIdDTO, @Body() article: ArticleDTO) {
    return this.appService.putArticle(parameters.id, article);
  }

  @Delete("articles/:id")
  @ApiTags("Articles")
  @ApiOperation({
    summary: "Deletes an article by id",
    description: "Deletes an article by id",
  })
  deleteArticle(@Param() parameters: SearchIdDTO) {
    return this.appService.deleteArticle(parameters.id);
  }
}
