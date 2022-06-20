import { LaunchDTO } from "./launch.dto";
import { EventDTO } from "./event.dto";
import { IsBoolean, IsDateString, IsInt, IsObject, IsOptional, IsPositive, IsString } from "class-validator";

export class ArticleDTO {
  @IsInt()
  @IsPositive()
  readonly id: number;
  @IsBoolean()
  readonly featured: boolean;
  @IsString()
  readonly title: string;
  @IsString()
  readonly url: string;
  @IsOptional()
  @IsString()
  readonly imageUrl?: string;
  @IsString()
  readonly newsSite: string;
  @IsOptional()
  @IsString()
  readonly summary?: string;
  @IsDateString()
  readonly publishedAt: string;
  @IsOptional()
  @IsObject({each: true})
  readonly launches?: Array<LaunchDTO>;
  @IsOptional()
  @IsObject({each: true})
  readonly events?: Array<EventDTO>;
}