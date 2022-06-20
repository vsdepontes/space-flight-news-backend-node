import { HttpException, HttpStatus } from "@nestjs/common";

export class ArticleAlreadyExists extends HttpException {
  constructor() {
    super("Artigo já existe!", HttpStatus.BAD_REQUEST);
  }
}