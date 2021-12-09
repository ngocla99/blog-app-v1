import { Profile } from './profile.model';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string;
  favorited: string;
  favoritesCount: string;
  author: Profile;
}

export interface ArticleData {
  articles: Article[];
  articlesCount: number;
}
