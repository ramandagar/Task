 
import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: {
    slots: [],
  },
  reducers: {
    addSlot: (state, action) => {
      state.slots.push(action.payload);
    },
    updateSlot: (state, action) => {
      const { index, slot } = action.payload;
      state.slots[index] = slot;
    },
    deleteSlot: (state, action) => {
      const index = action.payload;
      state.slots.splice(index, 1);
    },
  },
});

export const { addSlot, updateSlot, deleteSlot } = scheduleSlice.actions;

export default scheduleSlice.reducer;
