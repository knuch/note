import { Note } from './definitions';

const wait = async (delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
};

export const encrypt = async (data: any) => {
  await wait(500);
  return data;
}

export const decrypt = async (data: any) => {
  await wait(500);
  return data;
}

const localStorageKey = 'notes-demo-saved-data';

export const loadPersistedNotes = () => {
  const persistedNotes = localStorage.getItem(localStorageKey);
  if (persistedNotes === null) return null;
  return JSON.parse(persistedNotes);
}

export const persistNotes = (notes: Note[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(notes));
}
