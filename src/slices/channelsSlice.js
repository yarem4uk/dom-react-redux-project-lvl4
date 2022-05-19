// @ts-check
/* eslint-disable no-param-reassign */
import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    console.log('fetch data')
    const response = await axios.get(routes.dataPath(), {
      headers: getAuthHeader(),
    });
    return response.data;
  }
);

// export const sendTask = createAsyncThunk(
//   'tasks/sendTask',
//   async (task) => {
//     const { data } = await axios.post(routes.tasksPath(), task);
//     return data;
//   },
// );

// export const removeTask = createAsyncThunk(
//   'tasks/removeTask',
//   async (id) => {
//     await axios.delete(routes.removeTaskPath(id));
//     return id;
//   },
// );

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActive(state, { payload }) {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    });

    // .addCase(fetchChannels.rejected, (state, action) => {
    //   console.log('error');
    //   console.log(action, 'error');
    //   // state.channels = action.payload;
    // });
    // .addCase(sendTask.fulfilled, (state, action) => {
    //   state.tasks.unshift(action.payload);
    // })
    // .addCase(removeTask.fulfilled, (state, action) => {
    //   const id = action.payload;
    //   state.tasks = state.tasks.filter((t) => t.id !== id);
    // });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
