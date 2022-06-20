import { HttpException, HttpStatus } from "@nestjs/common";

export class ArticleNotFound extends HttpException {
  constructor() {
    super("Artigo não encontrado!", HttpStatus.NO_CONTENT);
  }
}