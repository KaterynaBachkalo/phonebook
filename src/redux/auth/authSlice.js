import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  registerThunk,
  logInThunk,
  logOutThunk,
  refreshUserThunk,
} from './operations';
import { toast } from 'react-toastify';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;

  if (state.error === 400) {
    toast.error('The email or password are incorrect', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }
};

const handleFulfilled = (state, action) => {
  state.accessToken = action.payload.accessToken;
  state.user = action.payload.user;
  state.isLoading = false;
  state.authenticated = true;
  state.error = null;
};

const INITIAL_STATE = {
  accessToken: null,
  user: {
    email: null,
    name: null,
  },
  authenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,

  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, handleFulfilled)

      .addCase(logInThunk.fulfilled, handleFulfilled)

      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authenticated = true;
        state.user = action.payload;
        // state.error = null;
        if (state.accessToken === null) return;
      })

      .addCase(logOutThunk.fulfilled, (state, action) => {
        state.accessToken = null;
        state.user = { email: null, name: null };
        state.isLoading = false;
        state.authenticated = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          logOutThunk.pending,
          logInThunk.pending,
          refreshUserThunk.pending,
          registerThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          logOutThunk.rejected,
          logInThunk.rejected,
          refreshUserThunk.rejected,
          registerThunk.rejected
        ),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
