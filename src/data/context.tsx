import React, { useContext, useReducer } from 'react';
import { Action, State } from './definitions';
import { notesReducer } from './reducers';
import { nanoid } from 'nanoid';
import { loadPersistedNotes } from './utils';;

const savedNotes = loadPersistedNotes();
const defaultnotes = [
  {
    title: 'My first note',
    id: nanoid(),
    text: '#Markdown text'
  },
  {
    title: 'My second note',
    id: nanoid(),
    text: '#Markdown text'
  },
  {
    title: 'My third note',
    id: nanoid(),
    text: '#Markdown text'
  }
];

const initialState: State = {
  currentNote: undefined,
  mode: 'view',
  loading: false,
  notes: savedNotes ? savedNotes : defaultnotes
}

type ContextType = { state: State, dispatch: React.Dispatch<Action> }
const AppContext = React.createContext<ContextType>(undefined!);

export const useAppContext: () => ContextType = () => {
  return useContext(AppContext);
}

const ContextProvider: (args: any) => any = ({ children }) => {
  const AppContextProvider = AppContext.Provider;
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <AppContextProvider value={{ state, dispatch }
    }>
      {children}
    </AppContextProvider>
  );
}

export default ContextProvider;
