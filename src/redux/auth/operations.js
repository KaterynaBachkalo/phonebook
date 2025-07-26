import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const phoneBookInstance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Utility to add JWT
const setToken = token => {
  phoneBookInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await phoneBookInstance.post(
        '/users/register',
        formData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const logInThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await phoneBookInstance.post('/users/login', formData);

      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await phoneBookInstance.post('/users/logout');

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const token = state.auth.accessToken;
    try {
      setToken(token);
      const response = await phoneBookInstance.get('/users/current');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      if (!token) return false;
      return true;
    },
  }
);

// {name: "test_user", email: "test_unique_user_mail@mail.com"}
