import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    db: [
      {
        _id: 1,
        house: 1,
        ref: "Device",
        obj_id: 1,
        content: "Bật quạt thông gió",
        value: {
          is_on: true,
        },
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 2,
        house: 1,
        ref: "Device",
        obj_id: 1,
        content: "Tắt quạt thông gió",
        value: {
          is_on: false,
        },
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
  },
  reducers: {
    addReport: (state, action) => {},
    removeReport: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addReport, removeReport } = reportSlice.actions;

export default reportSlice.reducer;
