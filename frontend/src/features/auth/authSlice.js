import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const getCookie = (cookieName) => {
  let cookie = {};
  document.cookie.split(';').forEach((el) => {
    let [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
};

const userFromCookie = {
  id: getCookie('userid') ? getCookie('userid') : null,
  username: getCookie('username')
    ? getCookie('username').replace(/%20/g, ' ')
    : null,
};

const initialState = {
  user: userFromCookie ? userFromCookie : { id: null, username: null },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUnlogged: false,
  message: '',
};

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isUnlogged = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'You have been registered, you can now log in';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = {
          id: action.payload.user._id,
          username: action.payload.user.username,
          email: action.payload.user.email,
        };
        state.message = `You are connected ${action.payload.user.username}`;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
