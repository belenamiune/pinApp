import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  state => !!state.uid
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  state => ({ uid: state.uid, email: state.email })
);