import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { UserState } from './user.reducer';

export const selectUserState = (state: AppState) => state.user;

export const selectAllUsers = createSelector(selectUserState, (state: UserState) => state.users);
export const selectUserDetails = createSelector(selectUserState, (state: UserState) => state.user);
export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);
