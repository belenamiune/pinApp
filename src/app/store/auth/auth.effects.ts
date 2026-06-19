import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  authStateChanged$ = createEffect(() =>
    this.afAuth.authState.pipe(
      map(user => AuthActions.authStateChanged({
        uid: user?.uid ?? null,
        email: user?.email ?? null
      }))
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
          map(credential => AuthActions.loginSuccess({
            uid: credential.user!.uid,
            email: credential.user!.email!
          })),
          catchError(error =>
            of(AuthActions.loginFailure({ error: error.code }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
      tap(() => this.router.navigate(['/customers']))
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ email, password }) =>
        from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
          map(credential => AuthActions.registerSuccess({
            uid: credential.user!.uid,
            email: credential.user!.email!
          })),
          catchError(error =>
            of(AuthActions.registerFailure({ error: error.code }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        from(this.afAuth.signOut()).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess()))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => this.router.navigate(['/auth']))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
}