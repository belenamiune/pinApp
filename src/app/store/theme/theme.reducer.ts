import { createReducer, on } from '@ngrx/store';
import * as ThemeActions from './theme.actions';

export interface ThemeState {
  isDark: boolean;
}

export const initialState: ThemeState = {
  isDark: false
};

export const themeReducer = createReducer(
  initialState,
  on(ThemeActions.toggleTheme, state => ({ isDark: !state.isDark }))
);