import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

import { RouterStateModel } from '../reducers';

const selectRouterFeatureState = createFeatureSelector<RouterReducerState<RouterStateModel>>('router');

const selectRouterState = createSelector(
  selectRouterFeatureState,
  (routerFeatureState: RouterReducerState<RouterStateModel>) => routerFeatureState?.state
);

const selectUrl = createSelector(
  selectRouterState,
  (state: RouterStateModel): string => state?.url
);

const selectParams = createSelector(
  selectRouterState,
  (state: RouterStateModel): Params => state?.params
);

const selectQueryParams = createSelector(
  selectRouterState,
  (state: RouterStateModel): Params => state?.queryParams
);

const selectSegments = createSelector(
  selectRouterState,
  (state: RouterStateModel): string[] => state?.segments
);

export const routerSelectors = {
  selectRouterFeatureState,
  selectRouterState,
  selectUrl,
  selectParams,
  selectQueryParams,
  selectSegments,
};
