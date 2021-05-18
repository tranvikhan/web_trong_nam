import { createSlice } from "@reduxjs/toolkit";

export const seasonSlice = createSlice({
  name: "season",
  initialState: {
    db: [
      {
        _id: 1,
        house: 1,
        steps_active: 0,
        start_day: "2021-04-10",
        steps: [
          {
            _id: 1,
            info: {
              name: "Ủ đông",
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
            _id: 2,
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
            _id: 3,
            info: {
              name: "Ra quả thế đợt 1",
              day: 3,
              ignored: false,
            },
            environments: {
              temperature: [30, 32],
              humidity: [85, 95],
              light: [0, 900],
            },
          },
          {
            _id: 4,
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
            _id: 5,
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
        ],
        is_active: true,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
  },
  reducers: {
    addSeason: (state, action) => {},
    removeSeason: (state, action) => {},
    updateSeason: (state, action) => {
      state.db = state.db.map((season) =>
        season._id === action.payload._id ? { ...action.payload } : season
      );
    },
    addStep: (state, action) => {
      state.db = state.db.map((season) => {
        if (season._id === action.payload.season_id) {
          let newSteps = [...season.steps];
          newSteps.push({
            _id: newSteps[newSteps.length - 1]._id + 1,
            info: {
              name: "Tên giai đoạn",
              day: 4,
              ignored: false,
            },
            environments: {
              temperature: [30, 32],
              humidity: [85, 95],
              light: [0, 900],
            },
          });
          return {
            ...season,
            steps: newSteps,
          };
        }
        return season;
      });
    },
    updateStep: (state, action) => {
      state.db = state.db.map((season) => {
        if (season._id === action.payload.season_id) {
          console.log("OK");
          let newSteps = season.steps.map((step) => {
            if (step._id === action.payload.step._id) {
              return action.payload.step;
            }
            return step;
          });
          return { ...season, steps: newSteps };
        }
        return season;
      });
      console.log(action.payload);
    },
    removeStep: (state, action) => {
      state.db = state.db.map((season) => {
        if (season._id === action.payload.season_id) {
          let newSteps = [...season.steps];
          newSteps = newSteps.filter(
            (step) => step._id != action.payload.step_id
          );
          return {
            ...season,
            steps: newSteps,
          };
        }
        return season;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSeason,
  removeSeason,
  updateSeason,
  addStep,
  updateStep,
  removeStep,
} = seasonSlice.actions;

export default seasonSlice.reducer;
