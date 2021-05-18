import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./featrures/couter";
import mqttReducer from "./featrures/mqttRedux";
import environmentReducer from "./featrures/environmentRedux";

import accessReducer from "./featrures/accessRedux";
import deviceReducer from "./featrures/deviceRedux";
import houseReducer from "./featrures/houseRedux";
import notificationReducer from "./featrures/notificationRedux";
import reportReducer from "./featrures/reportRedux";
import routerReducer from "./featrures/routerRedux";
import seasonReducer from "./featrures/seasonRedux";
import sensorReducer from "./featrures/sensorRedux";
import userReducer from "./featrures/userRedux";
import dataReducer from "./featrures/dataRedux";
export default configureStore({
  reducer: {
    counter: counterReducer,
    mqtt: mqttReducer,
    environment: environmentReducer,
    /* Chính thức */
    access: accessReducer,
    device: deviceReducer,
    house: houseReducer,
    notification: notificationReducer,
    report: reportReducer,
    router: routerReducer,
    season: seasonReducer,
    sensor: sensorReducer,
    user: userReducer,
    data: dataReducer,
  },
});
