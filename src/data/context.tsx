import React, { useContext, useReducer } from 'react';
import { Action, State } from './definitions';
import { notesReducer } from './reducers';
import { nanoid } from 'nanoid';

const initialState: State = {
  currentNote: undefined,
  mode: 'view',
  notes: [
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
  ]
}

type ContextProps = undefined | { state: State, dispatch: React.Dispatch<Action> }
const AppContext = React.createContext<ContextProps>(undefined);

export const useAppContext: () => ContextProps = () => {
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
