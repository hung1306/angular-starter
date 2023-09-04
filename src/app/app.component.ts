import { Component, OnInit } from '@angular/core';
import { NavigationError, Router } from '@angular/router';

import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly _router: Router) {
  }

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationError),
        tap(() => {
          this._router.navigate([''], { skipLocationChange: true });
        }),
      ).subscribe();
  }

}
