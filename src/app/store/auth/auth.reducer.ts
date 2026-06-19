import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  uid: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  uid: null,
  email: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,

  // Login
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { uid, email }) => ({
    ...state,
    uid,
    email,
    loading: false
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Register
  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { uid, email }) => ({
    ...state,
    uid,
    email,
    loading: false
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Logout
  on(AuthActions.logoutSuccess, () => ({ ...initialState })),

  // Sync con Firebase authState
  on(AuthActions.authStateChanged, (state, { uid, email }) => ({
    ...state,
    uid,
    email
  }))
);