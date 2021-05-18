import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    db: [
      {
        _id: 1,
        username: "tranvikhan",
        email: "tranvikhan@gmail.com",
        password: "123456",

        fullname: "Trần Vi Khan",
        phone: "",
        dateOfBirth: "1999-06-06",
        gender: "Male",

        address: "",
        status: "online",
        avatar: "https://i.pravatar.cc/400",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 2,
        username: "tranviluong",
        email: "tranviluong@gmail.com",
        password: "123456",

        fullname: "Trần Vi Lượng",
        phone: "",
        dateOfBirth: "2001-01-01",
        gender: "Male",

        address: "",
        status: "online",
        avatar: "https://i.pravatar.cc/401",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 3,
        username: "nguyenquoctoan",
        email: "nguyenquoctoan@gmail.com",
        password: "123456",

        fullname: "Nguyễn Quốc Toàn",
        phone: "",
        dateOfBirth: "1999-06-06",
        gender: "Male",

        address: "",
        status: "online",
        avatar: "https://i.pravatar.cc/402",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 4,
        username: "duongynguyen",
        email: "duongynguyen@gmail.com",
        password: "123456",

        fullname: "Dương Ý Nguyện",
        phone: "",
        dateOfBirth: "1999-07-06",
        gender: "Male",

        address: "",
        status: "online",
        avatar: "https://i.pravatar.cc/403",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
      {
        _id: 5,
        username: "nguyenvana",
        email: "nguyenvana@gmail.com",
        password: "123456",

        fullname: "Nguyễn Văn A",
        phone: "",
        dateOfBirth: "1999-08-16",
        gender: "Male",

        address: "",
        status: "online",
        avatar: "https://i.pravatar.cc/404",
        create_at: "2021-04-01",
        update_at: "2021-04-01",
      },
    ],
    active: 1,
  },
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
    register: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { login, register, logout } = userSlice.actions;

export default userSlice.reducer;
