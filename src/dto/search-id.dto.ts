import { IsNumberString } from "class-validator";

export class SearchIdDTO {
  @IsNumberString()
  readonly id: number;
}