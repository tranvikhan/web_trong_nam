import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    db: [
      {
        _id: 1,
        user: 1,
        content: "Hello world",
        type: "success",
        ref: "User",
        obj_id: 1,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.push({ ...action.payload, id: state.list.length });
    },
    removeNotification: (state, action) => {
      state.list = state.list.filter((rp, i) => rp.id != action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNotification,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
