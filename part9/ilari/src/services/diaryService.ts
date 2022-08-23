import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NoIdDiaryEntry } from '../types';

// ISSUE: Since the diaries.json already has values declared, the typescirpt compiler has inferred the weather field to be of type string, not Weather
// Fix: Type assertion, but that's as a last resort as it can lead to nasty runtime errors
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const addDiary = (entry: NoIdDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

// The "Pick" Utility Type allows us to choose what fields of an existing type we want to use. Suppose we want to hide the comments

/*
const getNonSensitiveEntries = (): Array<Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>> => {

};
*/

// How come there's no error when we return all the complete diary entries?
// TS does not prohibit excess fields, it only checks whether we have all required fields
// Because TypeScript doesn't modify the actual data but only its type, we need to exclude the fields ourselves
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id, date, weather, visibility
  }));
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};