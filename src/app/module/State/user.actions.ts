import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User List] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User List] Load Users Success', props<{ users: any[] }>());
export const loadUsersFailure = createAction('[User List] Load Users Failure', props<{ error: any }>());

export const loadUserDetails = createAction('[User Details] Load User', props<{ id: number }>());
export const loadUserDetailsSuccess = createAction('[User Details] Load User Success', props<{ user: any }>());
export const loadUserDetailsFailure = createAction('[User Details] Load User Failure', props<{ error: any }>());
