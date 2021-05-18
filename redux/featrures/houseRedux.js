import { createSlice } from "@reduxjs/toolkit";

export const houseSlice = createSlice({
  name: "house",
  initialState: {
    db: [
      {
        _id: 1,

        name: "Nhà trồng nấm rơm",
        description: "Châu Thành - Hậu Giang",

        size: {
          x: 20,
          y: 10,
        },
        structure: [
          {
            _id: 0,
            sensor: 1,
            location: {
              x: 10,
              y: 10,
            },
          },
          {
            _id: 2,
            sensor: 2,
            location: {
              x: 2,
              y: 2,
            },
          },
        ],
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 2,

        name: "Nhà trồng nấm A",
        description: "Châu Thành - Hậu Giang",

        size: {
          x: 20,
          y: 10,
        },
        structure: [],
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 3,

        name: "Nhà trồng nấm B",
        description: "Châu Thành - Hậu Giang",

        size: {
          x: 20,
          y: 10,
        },
        structure: [],
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 4,

        name: "Nhà trồng nấm C",
        description: "Châu Thành - Hậu Giang",

        size: {
          x: 20,
          y: 10,
        },
        structure: [],
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
    current: 1,
  },
  reducers: {
    addHouse: (state, action) => {},
    updateHouse: (state, action) => {},
    removeHouse: (state, action) => {},
    setCurrentHouse: (state, action) => {},
    addHouseStructure: (state, action) => {},
    removeStructure: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addHouse,
  updateHouse,
  removeHouse,
  setCurrentHouse,
  addHouseStructure,
  removeStructure,
} = houseSlice.actions;

export default houseSlice.reducer;
