import { createAsyncThunk } from '@reduxjs/toolkit';
import { phoneBookInstance } from 'redux/auth/operations';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await phoneBookInstance.get('/contacts');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await phoneBookInstance.post('/contacts', {
        name,
        number,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await phoneBookInstance.delete(`/contacts/${contactId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
