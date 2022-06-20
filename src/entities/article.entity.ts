import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EventModel } from "src/models/event.model";
import { LaunchModel } from "src/models/launch.model";

@Schema()
export class Article extends Document {
  @Prop()
    id: number;
  @Prop()
    featured: boolean;
  @Prop()
    title: string;
  @Prop()
    url: string;
  @Prop()
    imageUrl?: string;
  @Prop()
    newsSite: string;
  @Prop()
    summary?: string;
  @Prop()
    publishedAt: string;
  @Prop([LaunchModel])
    launches?: Array<LaunchModel>;
  @Prop([EventModel])
    events?: Array<EventModel>;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);