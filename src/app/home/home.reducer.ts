import { Article } from '../shared/model/article.model';
import {
  HomeActions,
  GET_NUMBER_PAGES,
  GET_ARTICLES,
  GET_CURRENT_PAGE,
} from './home.actions';

export interface State {
  numberPages: number[];
  currentPage: number;
  articles: Article[];
}

const initialState: State = {
  numberPages: [],
  currentPage: 1,
  articles: [],
};

export function HomeReducer(state = initialState, action: HomeActions) {
  switch (action.type) {
    case GET_NUMBER_PAGES:
      return { ...state, numberPages: action.payload };
    case GET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    default:
      return state;
  }
}

export const getNumberPages = (state: State) => state.numberPages;
export const getCurrentPage = (state: State) => state.currentPage;
export const getArticles = (state: State) => state.articles;
