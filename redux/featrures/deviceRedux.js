import { createSlice } from "@reduxjs/toolkit";

export const deviceSlice = createSlice({
  name: "device",
  initialState: {
    db: [
      {
        _id: 1,
        hardware_id: "DV00001",
        name: "Quạt thông gió",
        type: "DV1",
        is_on: false,
        on_when: ["temperature-high"],
        port: 1,
        router: 1,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 2,
        hardware_id: "DV00002",
        name: "Quạt sưởi",
        type: "DV2",
        is_on: false,
        on_when: ["temperature-low"],
        port: 2,
        router: 1,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 3,
        hardware_id: "DV00003",
        name: "Máy phun sương",
        type: "DV3",
        is_on: false,
        on_when: ["humidity-low"],
        port: 3,
        router: 1,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 4,
        hardware_id: "DV00004",
        name: "Máy hút ẩm",
        type: "DV4",
        is_on: false,
        on_when: ["humidity-high"],
        port: 4,
        router: 1,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
  },
  reducers: {
    addDevice: (state, action) => {},
    removeDevice: (state, action) => {},
    updateDevice: (state, action) => {},
    onDevice: (state, action) => {},
    offDevice: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addReport,
  removeReport,
  updateDevice,
  onDevice,
  offDevice,
} = deviceSlice.actions;

export default deviceSlice.reducer;
