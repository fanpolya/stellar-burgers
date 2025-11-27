import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TLoginData } from '@utils-types';
import { RootState } from '../store';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  error: string;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: { email: '', name: '' },
  error: '',
  isAuthChecked: true,
  isAuthenticated: false
};

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const info = await loginUserApi(data);
    if (info.success) {
      setCookie('accessToken', info.accessToken);
      localStorage.setItem('refreshToken', info.refreshToken);
    }
    return info;
  }
);
export const logout = createAsyncThunk('user/logout', async () => {
  const info = await logoutApi();
  if (info.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return info;
});
export const fetchUser = createAsyncThunk('user/fetchUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          email: '',
          name: ''
        };
        state.isAuthenticated = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        console.log(action.error.message);
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const selectUser = (state: RootState) => state.user.user;
export const selectError = (state: RootState) => state.user.error;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectisAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export default userSlice.reducer;
