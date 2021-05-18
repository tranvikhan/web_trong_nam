import { createSlice } from "@reduxjs/toolkit";

export const environmentSlice = createSlice({
  name: "environment",
  initialState: {
    datas: { temperature: [28, 30], humidity: [50, 60], light: [100, 1000] },
    steps: [
      {
        id: "MV000001",
        info: {
          name: "Ủ đống",
          day: 21,
          ignored: false,
        },
        environments: {
          temperature: [30, 32],
          humidity: [79, 81],
          light: [0, 900],
        },
      },
      {
        id: "MV000002",
        info: {
          name: "Lan tơ",
          day: 14,
          ignored: false,
        },
        environments: {
          temperature: [30, 32],
          humidity: [85, 95],
          light: [0, 900],
        },
      },
      {
        id: "MV000003",
        info: {
          name: "Ra quả thế đợt 1",
          day: 3,
          ignored: false,
        },
        environments: {
          temperature: [30, 32],
          humidity: [95, 85],
          light: [0, 900],
        },
      },
      {
        id: "MV000004",
        info: {
          name: "Phơi trại",
          day: 1,
          ignored: true,
        },
        environments: {
          temperature: [20.5, 31],
          humidity: [40, 50],
          light: [0, 900],
        },
      },
      {
        id: "MV000005",
        info: {
          name: "Ra quả thế đợt 2",
          day: 4,
          ignored: false,
        },
        environments: {
          temperature: [30, 32],
          humidity: [85, 95],
          light: [0, 900],
        },
      },
      {
        id: "MV000006",
        info: {
          name: "Phơi trại",
          day: 3,
          ignored: true,
        },
        environments: {
          temperature: [30, 32],
          humidity: [85, 95],
          light: [0, 900],
        },
      },
      {
        id: "MV000007",
        info: {
          name: "Ra quả thế đợt 3",
          day: 4,
          ignored: false,
        },
        environments: {
          temperature: [30, 32],
          humidity: [85, 95],
          light: [0, 900],
        },
      },
    ],
  },
  reducers: {
    setEnvironments: (state, action) => {
      state.datas = action.payload;
    },
    addStep: (state, action) => {
      state.steps.push({
        id: Math.max(...state.steps.map((s) => s.id + 0)) + 1,
        info: {
          name: "No Name",
          day: 3,
          ignored: false,
        },
        environments: {
          temperature: [20.5, 31],
          humidity: [40, 50],
          light: [0, 900],
        },
      });
    },
    updateStep: (state, action) => {
      state.steps = state.steps.map((st) => {
        const newData = action.payload.step;
        if (st.id === action.payload.id) {
          return {
            id: st.id,
            info: {
              name:
                newData.info.name != null ? newData.info.name : st.info.name,
              day: newData.info.day != null ? newData.info.day : st.info.day,
              ignored:
                newData.info.ignored != undefined
                  ? newData.info.ignored
                  : st.info.ignored,
            },
            environments: {
              temperature:
                newData.environments.temperature != null
                  ? newData.environments.temperature
                  : st.environments.temperature,
              humidity:
                newData.environments.humidity != null
                  ? newData.environments.humidity
                  : st.environments.humidity,
              light:
                newData.environments.light != null
                  ? newData.environments.light
                  : st.environments.light,
            },
          };
        }
        return st;
      });
    },
    deleteStep: (state, action) => {
      state.steps = state.steps.filter((st) => st.id != action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setEnvironments,
  addStep,
  updateStep,
  deleteStep,
} = environmentSlice.actions;

export default environmentSlice.reducer;
