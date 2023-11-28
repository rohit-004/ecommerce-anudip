import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure
} from './auth.actions';

// export interface AuthState {
//   user: null,
//   loading: false,
//   error: null
// }

const initialState={
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, error:error, loading: true })),
  on(register, (state) => ({ ...state, loading: true, error: null })),
  on(registerSuccess, (state,{user}) => ({ ...state, loading: false, user , error:null })),
  on(registerFailure, (state, { error }) => ({ ...state, error:error, loading: true }))
);
