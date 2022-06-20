import { IsNumberString, IsOptional } from "class-validator";

export class PaginationDTO {
  @IsOptional()
  @IsNumberString()
  readonly limit: number;

  @IsOptional()
  @IsNumberString()
  readonly offset: number;
}