import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromHome from './home/home.reducer';

export interface State {
  ui: fromUI.State;
  home: fromHome.State;
}

export const reducers: ActionReducerMap<State, any> = {
  ui: fromUI.UiReducer,
  home: fromHome.HomeReducer,
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getHomeState = createFeatureSelector<fromHome.State>('home');
export const getNumberPages = createSelector(
  getHomeState,
  fromHome.getNumberPages
);
export const getCurrentPage = createSelector(
  getHomeState,
  fromHome.getCurrentPage
);
export const getArticles = createSelector(getHomeState, fromHome.getArticles);
