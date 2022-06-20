import { IsInt, IsPositive, IsString } from "class-validator";

export class LaunchDTO {
  @IsInt()
  @IsPositive()
  readonly id: number;
  @IsString()
  readonly provider: string;
}