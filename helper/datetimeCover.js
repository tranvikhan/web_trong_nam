const dateToString = (data) => {
  let date = new Date(data);
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds() +
    " " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
};
const timeToString = (data) => {
  let date = new Date(data);
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};
const newTimeString = () => {
  let date = new Date();
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};

const getTimeSession = (time) => {
  let hours = time.getHours();
  if (hours > 0 && hours < 11) return "buổi sáng";
  if (hours >= 11 && hours < 13) return "buổi trưa";
  if (hours >= 13 && hours < 18) return "buổi chiều";
  return "buổi tối";
};
export { dateToString, timeToString, newTimeString, getTimeSession };
