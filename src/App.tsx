import React from 'react';
import TodoItem from './components/TodoItem';
import TodoDetail from './components/TodoDetail';
import './styles/App.css';
import { useAppContext } from './data/context';
import { Todo } from './data/definitions'

const App: React.FC = () => {
  const context = useAppContext();
  if (!context) return null;

  const { state, dispatch } = context;

  const newNote = () => {
    dispatch({ type: 'NEW' });
  }

  return (
    <>
      <div className="todo-head">
        {state.mode === 'view' && <button onClick={newNote} >+ New note</button>}
        {state.mode === 'edit' && <button disabled >+ New note</button>}
      </div>
      <div className="todo-columns">
        {/* Left pane: Todo List */}
        <div className="todo-pane-left">
          {state.todos.map((todo: Todo) => (
            <TodoItem
              id={todo.id}
              title={todo.title}
              isCurrent={state.currentTodo ? state.currentTodo.id === todo.id : false}
            />
          ))}
        </div>

        {/* Left pane: Todo detail */}
        <div className="todo-pane-right">
          {
            state.currentTodo && <TodoDetail
              todo={state.currentTodo}
              mode={state.mode}
            />
          }

        </div>
      </div>
    </>
  );
}

export default App;
