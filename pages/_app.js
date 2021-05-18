import "antd/dist/antd.dark.css";
/* import "antd/dist/antd.css"; */
/* ADD REDUX */
import store from "../redux/store";
import { Provider } from "react-redux";

import "../styles/globals.css";
import React from "react";
import MainLayout from "../components/Layout/mainLayout";
import SocketHook from "../components/Hook/SocketHook";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SocketHook>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SocketHook>
    </Provider>
  );
}

export default App;
