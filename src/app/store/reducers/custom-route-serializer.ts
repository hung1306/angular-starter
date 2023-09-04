import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateModel {
  url: string;
  params: Params;
  queryParams: Params;
  segments: string[];
}

export class CustomSerializer implements RouterStateSerializer<RouterStateModel> {
  serialize(routerState: RouterStateSnapshot): RouterStateModel {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    const segments = url?.split('/')?.filter(path => !!path) || [];

    return { url, params, queryParams, segments };
  }
}
