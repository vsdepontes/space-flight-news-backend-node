import { IsInt, IsPositive, IsString } from "class-validator";

export class EventDTO {
  @IsInt()
  @IsPositive()
  readonly id: number;
  @IsString()
  readonly provider: string;
}