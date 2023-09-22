import { Component, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { select, Store } from '@ngrx/store';

import { filter, take, tap } from 'rxjs';

import { accountActions, AppState, authActions, authSelectors, routerSelectors } from '@app/store';
import { NavigationRoutes } from '@app/const';
import { MatSidenav } from '@angular/material/sidenav';
import { Role } from '@app/models';

interface NavigationOption {
  label: string;
  routerLink: string[];
  role?: Role | Role[];
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav?: MatSidenav;

  NavigationRoutes = NavigationRoutes;

  navigationOptions: NavigationOption[] = [
    {
      label: 'Dashboard',
      routerLink: [''],
    },
    {
      label: 'Users',
      routerLink: [NavigationRoutes.Users],
      role: Role.Administrator,
    },
  ];
  segments: string[] = [];

  constructor(private readonly _store: Store<AppState>) {
    this.selectData();
  }

  ngOnInit(): void {
    this._store.pipe(
      select(authSelectors.selectIsLoggedIn),
      take(1),
      filter(isLoggedIn => !!isLoggedIn),
      tap(() => {
        this._store.dispatch(accountActions.getAccount());
      }),
    ).subscribe();
  }

  selectData() {
    this._store.pipe(
      select(routerSelectors.selectSegments),
      takeUntilDestroyed(),
      tap(segments => {
        this.segments = segments;
      }),
    ).subscribe();
  }

  onLogout() {
    this._store.dispatch(authActions.logout());
  }

  isRouterLinkActive(routerLink: string[]): boolean {
    return routerLink?.filter(path => !!path)?.[0] === this.segments?.[0];
  }

  onToggleSidenav() {
    this.sidenav!.toggle();
  }
}
