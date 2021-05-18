import { createSlice } from "@reduxjs/toolkit";

export const mqttSlice = createSlice({
  name: "mqtt",
  initialState: {
    client: null,
    datas: null,
  },
  reducers: {
    setClientMqtt: (state, action) => {
      state.client = action.payload;
    },
    setDatas: (state, action) => {
      state.datas = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setClientMqtt, setDatas } = mqttSlice.actions;

export default mqttSlice.reducer;
