import React, { useReducer } from 'react';
import TodoListItem from './TodoListItem';
import { todosReducer } from './reducers';
import { iState, tAction } from './definitions';

const initialState: iState = {
  todos: [],
  mode: 'view'
}

type ContextProps = undefined | { state: iState, dispatch: React.Dispatch<tAction> }
const AppContext = React.createContext<ContextProps>(undefined);

const App: React.FC = () => {

  const [state, dispatch] = useReducer(todosReducer, initialState);

  const newNote = () => {
    dispatch({ type: 'NEW' });
  }


  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <button onClick={newNote} >+ New note</button>
      { state.todos.map(todo => (
        <TodoListItem
          id={todo.id}
          text={todo.text}
        />
      ))}
    </AppContext.Provider>
  );
}

export default App;
