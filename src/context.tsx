import React, { useContext, useReducer } from 'react';
import { Action, State } from './definitions';
import { todosReducer } from './reducers';
import { nanoid } from 'nanoid';

const initialState: State = {
  currentTodo: undefined,
  mode: 'view',
  todos: [
    {
      title: 'My first note',
      id: nanoid(),
      text: '#Markdown text',
      completed: false,
    },
    {
      title: 'My second note',
      id: nanoid(),
      text: '#Markdown text',
      completed: false,
    },
    {
      title: 'My third note',
      id: nanoid(),
      text: '#Markdown text',
      completed: false,
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
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <AppContextProvider value={{ state, dispatch }
    }>
      {children}
    </AppContextProvider>
  );
}

export default ContextProvider;
