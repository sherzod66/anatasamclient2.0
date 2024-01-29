export const GetData = (date: number) => {
  const data = new Date(date);
  return `${data.getDate()}.${GetMonth(
    data
  )}.${data.getFullYear()}, ${data.getHours()}:${data.getMinutes()}`;
};

const getHours = (h: Date) => {
  const hours = new Date(h).getHours();
  return hours < 9 ? `0${hours}` : hours;
};
const getMin = (m: Date) => {
  const minutes = new Date(m).getMinutes();
  return minutes < 9 ? `0${minutes}` : minutes;
};

export const GetDataUid = () => {
  const data = new Date();
  return `${GetDate(data)}${GetMonth(data)}${data.getFullYear()}`;
};

const GetDate = (d: Date) => {
  const dt = new Date(d).getDate();
  return dt < 9 ? `0${dt}` : dt;
};
const GetMonth = (m: Date) => {
  let mn = new Date(m).getMonth() + 1;
  return mn <= 9 ? `0${mn}` : mn;
};

export const GetDataUidLast = (d: Date) => {
  const data = new Date(d);
  return `${GetDate(data)}${GetMonth(data)}${data.getFullYear()}`;
};
export const GetDataString = (d: number): string => {
  const data = new Date(d);
  return `${data.getFullYear()}-${GetMonth(data)}-${GetDate(data)}`;
};
