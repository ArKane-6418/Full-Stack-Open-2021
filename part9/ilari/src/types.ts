export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Windy = 'windy',
  Stormy = 'stormy'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

// Since we only want to exclude one field, we can use the Omit utility type
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NoIdDiaryEntry = Omit<DiaryEntry, 'id'>;