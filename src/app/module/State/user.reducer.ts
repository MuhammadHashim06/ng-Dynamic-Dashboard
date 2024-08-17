import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  users: any[];
  user: any;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  user: null,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserActions.loadUserDetailsSuccess, (state, { user }) => ({ ...state, user })),
  on(UserActions.loadUsersFailure, UserActions.loadUserDetailsFailure, (state, { error }) => ({ ...state, error }))
);
