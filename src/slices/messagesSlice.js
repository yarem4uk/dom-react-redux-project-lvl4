// @ts-check
/* eslint-disable no-param-reassign */
import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChannels } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      state.messages = action.payload.messages;
    });
  },
});

export default messagesSlice.reducer;
