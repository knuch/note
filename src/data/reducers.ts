import { nanoid } from 'nanoid';
import { Action, State } from './definitions';
import { persistNotes } from './utils';

export const notesReducer = (state: State, action: Action): State => {
  /* globally block interactions with the state when the app is loading
  * except for actions that end the loading state
  */
  if (state.loading) {
    switch (action.type) {
      case 'SAVE':
        break;
      case 'LOADING_END':
        break;
      default:
        return { ...state }
    }
  }

  switch (action.type) {
    case 'EDIT':
      return { ...state, mode: 'edit' };
    case 'LOADING':
      return { ...state, loading: true };
    case 'LOADING_END':
      return { ...state, loading: false };
    case 'NEW':
      // don't allow new when editing a note
      if (state.mode === 'edit') return { ...state };
      const newNote = {
        id: nanoid(),
        title: 'Note title',
        text: ''
      };
      const newNotes = [
        ...state.notes,
        newNote
      ];
      persistNotes(newNotes);
      return {
        ...state,
        notes: newNotes,
        currentNote: newNote,
        mode: 'edit'
      };
    case 'VIEW':
      return { ...state, mode: 'view' };
    case 'SAVE':
      const savedNotes = [...state.notes];
      savedNotes.splice(
        state.notes.findIndex(note => note.id === action.note.id),
        1,
        action.note
      )
      persistNotes(savedNotes);
      return {
        ...state,
        notes: savedNotes,
        mode: 'view',
        loading: false
      };
    case 'DELETE':
      const newState = { ...state, mode: 'view' }
      if (state.currentNote && state.currentNote.id === action.id) {
        newState.currentNote = undefined;
      }
      newState.notes = state.notes.filter(note => note.id !== action.id);
      persistNotes(newState.notes);
      return newState;
    case 'SELECT':
      // don't allow select when editing a note
      if (state.mode === 'edit') return { ...state };
      return {
        ...state,
        loading: true,
        currentNote: state.notes.find(note => note.id === action.id)
      };
    default:
      throw new Error(`Invalid action passed to notesReducer`)
  }
};
