exports.socketController = (socket, client) => {
  console.log("Hello socket: " + client.id);
  client.on("get_sensors", (data) => {
    socket.emit("get_sensors", data);
    console.log("SENSORS DATA: ", data);
  });
  client.on("get_devices", (data) => {
    socket.emit("get_devices", data);
    console.log("DEVICE DATA: ", data);
  });
  client.on("set_sensors", (data) => {
    socket.emit("set_sensors", data);
    console.log("SENSORS SET: ", data);
  });
  client.on("set_season", (data) => {
    socket.emit("set_season", data);
    console.log("SEASON SET: ", data);
  });
  client.on("set_devices", (data) => {
    socket.emit("set_devices", data);
    console.log("DEVICES SET: ", data);
  });
  client.on("set_sensors", (data) => {
    socket.emit("set_sensors", data);
    console.log("SENSORS SET: ", data);
  });
};
