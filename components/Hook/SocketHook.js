import React, { useState, useEffect, createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSensors, updateDevices } from "../../redux/featrures/dataRedux";
import { onDevice, offDevice } from "../../redux/featrures/deviceRedux";
var io = require("socket.io-client");
var socket = io.connect("http://localhost:3000");

export const SocketAction = createContext(null);
export function useSocket() {
  return useContext(SocketAction);
}

export default function SocketHook({ children }) {
  const dispatch = useDispatch();
  const sensor = useSelector((state) => state.sensor);
  const house = useSelector((state) => state.house);
  const device = useSelector((state) => state.device);
  const router = useSelector((state) => state.router);
  const season = useSelector((state) => state.season);
  const [currentSeason, setCurrentSeason] = React.useState(null);

  React.useEffect(() => {
    let tmp = season.db.filter(
      (ss) => ss.house === house.current && ss.is_active
    );
    if (tmp[0]) {
      setCurrentSeason(tmp[0]);
    }
  }, [season, house.current]);

  React.useEffect(() => {
    if (currentSeason) {
      let days = {};
      let steps = {};
      currentSeason.steps.map((step) => {
        days[step._id] = step.info.day;
        steps[step._id] = { ...step };
      });

      socket.emit("set_season", {
        set_season: {
          start_day: currentSeason.start_day,
          num_seasons: currentSeason.steps.length,
          days: days,
          steps: steps,
        },
      });
    }
  }, [currentSeason]);

  /*   useEffect(() => {
    let devices = {};
    let tmp = currentDevices(house, router, device);
    tmp.map((device) => {
      devices[device._id] = { ...device };
    });
    socket.emit("set_devices", devices);
    setCurrentDeviceState(tmp);
  }, [device]); */

  const currentSensors = (house, router, sensor) => {
    if (house.current) {
      let sensors = [];
      router.db.forEach((rt) => {
        if (rt.house === house.current) {
          sensor.db.forEach((sr) => {
            if (sr.router === rt._id) {
              sensors.push(sr);
            }
          });
        }
      });
      return sensors;
    }
    return [];
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("set_devices", (data) => {
      console.log("DEVICES SET: ", data);
    });
    socket.on("set_sensors", (data) => {
      console.log("SENSORS SET: ", data);
    });
    socket.on("get_sensors", (data) => {
      dispatch(
        updateSensors({
          list_sensor: currentSensors(house, router, sensor),
          data: data,
        })
      );
      console.log("CLIENT SENSORS DATA: ", data);
    });
    socket.on("get_devices", (data) => {
      dispatch(updateDevices(data));
      console.log("CLIENT DEVICE DATA: ", data);
    });
    socket.on("set_sensors", (data) => {
      console.log("CLIENT SENSORS SET: ", data);
    });
    socket.on("set_season", (data) => {
      console.log("CLIENT SEASON SET: ", data);
    });
  }, [house, router, sensor, device]);

  const sendMessage = (topic, data) => {
    socket.emit(topic, data);
  };
  const actions = {
    sendMessage,
  };

  return (
    <SocketAction.Provider value={actions}>{children}</SocketAction.Provider>
  );
}
