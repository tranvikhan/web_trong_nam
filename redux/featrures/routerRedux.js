import { createSlice } from "@reduxjs/toolkit";

export const routerSlice = createSlice({
  name: "router",
  initialState: {
    db: [
      {
        _id: 1,
        hardware_id: "RT001",
        name: "Raspberry Pi 3+",
        is_on: true,
        house: 1,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 2,
        hardware_id: "RT002",
        name: "Raspberry Pi 3+",
        is_on: false,
        house: null,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 3,
        hardware_id: "RT003",
        name: "Raspberry Pi 3+",
        is_on: false,
        house: null,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 4,
        hardware_id: "RT004",
        name: "Raspberry Pi 3+",
        is_on: false,
        house: null,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
  },
  reducers: {
    addRouter: (state, action) => {},
    removeRouter: (state, action) => {},
    activeRouter: (state, action) => {},
    unActiveRouter: (state, action) => {},
    onRouter: (state, action) => {},
    offRouter: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addRouter,
  removeRouter,
  activeRouter,
  unActiveRouter,
  onRouter,
  offRouter,
} = routerSlice.actions;

export default routerSlice.reducer;
