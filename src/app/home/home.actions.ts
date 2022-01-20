import { Action } from '@ngrx/store';
import { Article } from '../shared/model/article.model';

export const GET_NUMBER_PAGES = '[Home] Get Number Pages';
export const GET_CURRENT_PAGE = '[Home] Get Current Page';
export const GET_ARTICLES = '[Home] Get Articles';

export class GetNumberPages implements Action {
  readonly type = GET_NUMBER_PAGES;

  constructor(public payload: number[]) {}
}

export class GetCurrentPage implements Action {
  readonly type = GET_CURRENT_PAGE;

  constructor(public payload: number) {}
}

export class GetArticles implements Action {
  readonly type = GET_ARTICLES;

  constructor(public payload: Article[]) {}
}

export type HomeActions = GetNumberPages | GetCurrentPage | GetArticles;
