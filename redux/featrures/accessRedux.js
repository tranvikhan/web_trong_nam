import { createSlice } from "@reduxjs/toolkit";

export const accessSlice = createSlice({
  name: "access",
  initialState: {
    db: [
      {
        _id: 1,
        house: 1,
        user: 1,
        role: "Owner",
        accepted: true,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 3,
        house: 1,
        user: 2,
        role: "Manager",
        accepted: true,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 4,
        house: 1,
        user: 3,
        role: "Viewer",
        accepted: true,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 5,
        house: 2,
        user: 1,
        role: "Owner",
        accepted: true,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 6,
        house: 3,
        user: 1,
        role: "Manager",
        accepted: true,
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
  },
  reducers: {
    inviteAccess: (state, action) => {},
    removeAccess: (state, action) => {},
    acceptAccess: (state, action) => {},
    updateAccess: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { inviteAccess, removeAccess, acceptAccess, updateAccess } =
  accessSlice.actions;

export default accessSlice.reducer;
