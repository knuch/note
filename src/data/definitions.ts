
export interface Note {
  id: string;
  title: string;
  text: string;
  completed: boolean;
}

export interface State {
  notes: Array<Note>;
  currentNote?: Note
  mode: string;
}

export type Action =
  | { type: 'VIEW' }
  | { type: 'NEW' }
  | { type: 'EDIT' }
  | { type: 'SAVE', note: Note }
  | { type: 'SELECT', id: string }
  | { type: 'DELETE', id: string }
