import { createSlice } from "@reduxjs/toolkit";
import { newTimeString } from "../../helper/datetimeCover";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    environments: {
      temperature: {
        current: 20,
        serial: [],
      },
      humidity: {
        current: 90,
        serial: [],
      },
      light: {
        current: 200,
        serial: [],
      },
    },
  },
  reducers: {
    updateSensors: (state, action) => {
      let newTemperatureSerial = [...state.environments.temperature.serial];
      let newHumiditySerial = [...state.environments.humidity.serial];
      let currentTemperature = 0;
      let numTemperature = 0;
      let currentHumidity = 0;
      let numHumidity = 0;

      action.payload.list_sensor.map((sensorInfo, index) => {
        newTemperatureSerial[index] = {
          name: sensorInfo.name,
          hardware_id: sensorInfo.hardware_id,
          data: newTemperatureSerial[index]
            ? [...newTemperatureSerial[index].data]
            : [],
        };

        if (
          newTemperatureSerial[index].hardware_id === action.payload.data._id
        ) {
          if (newTemperatureSerial[index].data.length >= 10)
            newTemperatureSerial[index].data.shift();

          newTemperatureSerial[index].data.push({
            x: newTimeString(),
            y: action.payload.data.value.temperature,
          });
        }
        if (
          newTemperatureSerial[index] &&
          newTemperatureSerial[index].data &&
          newTemperatureSerial[index].data.length > 0
        ) {
          currentTemperature =
            currentTemperature +
            newTemperatureSerial[index].data[
              newTemperatureSerial[index].data.length - 1
            ].y;
          numTemperature++;
        }
      });

      state.environments.temperature.serial = newTemperatureSerial;
      state.environments.temperature.current =
        currentTemperature / numTemperature;
      // Humidity
      action.payload.list_sensor.map((sensorInfo, index) => {
        newHumiditySerial[index] = {
          name: sensorInfo.name,
          hardware_id: sensorInfo.hardware_id,
          data: newHumiditySerial[index]
            ? [...newHumiditySerial[index].data]
            : [],
        };

        if (newHumiditySerial[index].hardware_id === action.payload.data._id) {
          if (newHumiditySerial[index].data.length >= 10)
            newHumiditySerial[index].data.shift();

          newHumiditySerial[index].data.push({
            x: newTimeString(),
            y: action.payload.data.value.humidity,
          });
        }
        if (
          newHumiditySerial[index] &&
          newHumiditySerial[index].data &&
          newHumiditySerial[index].data.length > 0
        ) {
          currentHumidity =
            currentHumidity +
            newHumiditySerial[index].data[
              newHumiditySerial[index].data.length - 1
            ].y;
          numHumidity++;
        }
      });

      state.environments.humidity.serial = newHumiditySerial;
      state.environments.humidity.current = currentHumidity / numHumidity;
      //state.environments = action.payload;
    },
    updateDevices: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { updateSensors, updateDevices } = dataSlice.actions;

export default dataSlice.reducer;
