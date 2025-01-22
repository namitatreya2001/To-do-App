import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leftSidebarVisible: true,
  rightSidebarVisible: true,
  selectedDate: null,
  selectedTime: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLeftSidebar: (state) => {
      state.leftSidebarVisible = !state.leftSidebarVisible;
    },
    toggleRightSidebar: (state) => {
      state.rightSidebarVisible = !state.rightSidebarVisible;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },
  },
});

export const { toggleLeftSidebar, toggleRightSidebar, setSelectedDate, setSelectedTime } = uiSlice.actions;
export default uiSlice.reducer;