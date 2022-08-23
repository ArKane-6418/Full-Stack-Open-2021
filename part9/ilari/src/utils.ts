import { NoIdDiaryEntry, Weather, Visibility } from "./types";

// Type guard: function which returns a boolean and has a type predicate as the return type
// General form of type predicate is "parameterName is Type"
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  // Since we check if date is a string before checking if it's a date, we know that if we reach isDate, date is a string
  // This is why we don't need to make the type unknown in isDate
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// This function will not hold up if we change the type definition of Weather
// Solution: change it to enum

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility = (param: any): param is Visibility => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
      throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};

type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown };

const toNewDiaryEntry = ({ comment, date, weather, visibility } : Fields): NoIdDiaryEntry => {
  // Need to ensure the object we are posting is the correct type
  const newEntry: NoIdDiaryEntry = {
    comment: parseComment(comment),
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility)
  };

  return newEntry;
};

export default toNewDiaryEntry;