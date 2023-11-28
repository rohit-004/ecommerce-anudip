import { createReducer, on } from '@ngrx/store';
import { getUserProfile, getUserProfileFailure, getUserProfileSuccess, logoutSuccess } from './user.action';

// export interface AuthState {
//   user: null,
//   loading: false,
//   error: null
// }

const initialState={
  UserProfile: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(getUserProfile, (state) => ({ ...state, loading: true, error: null })),
  on(getUserProfileSuccess, (state, { userProfile }) => ({ ...state, userProfile, loading: false, error: null })),
  on(getUserProfileFailure, (state, { error }) => ({ ...state, error:error, loading: true })),

  on(logoutSuccess,()=>initialState)
);
