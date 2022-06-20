import { IsBoolean, IsInt, IsPositive } from "class-validator";

export class DeleteResultDTO {
  @IsBoolean()
  readonly acknowledged: boolean;
  @IsInt()
  @IsPositive()
  readonly deletedCount: number;
}