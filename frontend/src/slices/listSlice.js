import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  selectedList: null,
  loading: false,
  error: null,
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedList: (state, action) => {
      state.selectedList = action.payload;
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    updateList: (state, action) => {
      const index = state.lists.findIndex((list) => list._id === action.payload._id);
      if (index !== -1) {
        state.lists[index] = action.payload;
      }
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter((list) => list._id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLists,
  setSelectedList,
  addList,
  updateList,
  deleteList,
  setLoading,
  setError,
} = listSlice.actions;

export default listSlice.reducer;
