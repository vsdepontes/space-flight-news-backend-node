import { ArticleDTO } from "src/dto/article.dto";

export const ArticleDTOStub = (): ArticleDTO => {
  return {
    events: [{
      id: 4321,
      provider: "SpaceX",
    }],
    launches: [{
      id: 1234,
      provider: "SpaceX",
    }],
    publishedAt: "2022-03-09T17:34:06.000Z",
    summary: "New trade sanctions aimed at Russia’s space sector were announced March 9 by \
      UK Foreign Secretary Liz Truss.",
    newsSite: "SpaceNews",
    imageUrl: "https://spacenews.com/wp-content/uploads/2022/03/Screen-Shot-2022-03-09-at-12.22.28-PM.png",
    url: "https://spacenews.com/uk-bans-space-related-exports-to-russia/",
    title: "UK bans space-related exports to Russia",
    featured: false,
    id: 14185,
  };
};