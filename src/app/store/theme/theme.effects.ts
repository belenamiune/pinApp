import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import * as ThemeActions from './theme.actions';
import { selectIsDark } from './theme.selectors';

@Injectable()
export class ThemeEffects {

  toggleTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.toggleTheme),
      withLatestFrom(this.store.select(selectIsDark)),
      tap(([, isDark]) => {
        document.body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      })
    ),
    { dispatch: false }
  );

  initTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Init'),
      tap(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
          document.body.classList.add('dark-theme');
          this.store.dispatch(ThemeActions.toggleTheme());
        }
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}
}