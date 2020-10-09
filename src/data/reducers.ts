import { nanoid } from 'nanoid';
import { Action, State } from './definitions';

export const notesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'EDIT':
      return { ...state, mode: 'edit' };
    case 'NEW':
      // don't allow new when editing a note
      if (state.mode === 'edit') return { ...state };
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: nanoid(),
            title: 'My new node title',
            text: '',
            completed: false
          }
        ]
      };
    case 'VIEW':
      return { ...state, mode: 'view' };
    case 'SAVE':
      const newNotes = [...state.notes];
      newNotes.splice(
        state.notes.findIndex(note => note.id === action.note.id),
        1,
        action.note
      )
      return {
        ...state,
        notes: newNotes,
        mode: 'view'
      };
    case 'DELETE':
      const newState = { ...state, mode: 'view' }
      if (state.currentNote && state.currentNote.id === action.id) {
        newState.currentNote = undefined;
      }
      newState.notes = state.notes.filter(note => note.id !== action.id);
      return newState;
    case 'SELECT':
      // don't allow select when editing a note
      if (state.mode === 'edit') return { ...state };
      return {
        ...state,
        currentNote: state.notes.find(note => note.id === action.id)
      };
    default:
      throw new Error(`Invalid action passed to notesReducer`)
  }
};
