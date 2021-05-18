import { createSlice } from "@reduxjs/toolkit";

export const sensorSlice = createSlice({
  name: "sensor",
  initialState: {
    db: [
      {
        _id: 1,
        hardware_id: "SR00001",
        name: "Cảm biến 1",
        type: ["temperature", "humidity"],
        router: 1,
        is_on: true,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 2,
        hardware_id: "SR00002",
        name: "Cảm biến 2",
        type: ["temperature", "humidity"],
        router: 1,
        is_on: true,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 3,
        hardware_id: "SR00002",
        name: "Cảm biến 3",
        type: ["temperature", "humidity"],
        router: null,
        is_on: true,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 3,
        hardware_id: "SR00002",
        name: "Cảm biến 4",
        type: ["temperature", "humidity"],
        router: null,
        is_on: true,
        activate_key: "CUSC",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
  },
  reducers: {
    addSensor: (state, action) => {},
    removeSensor: (state, action) => {},
    activeSensor: (state, action) => {},
    unActiveSensor: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addSensor,
  removeSensor,
  activeSensor,
  unActiveSensor,
} = sensorSlice.actions;

export default sensorSlice.reducer;
