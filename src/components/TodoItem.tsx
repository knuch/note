import React from 'react';
import { useAppContext } from '../data/context';

interface TodoListItemProps {
  id: string
  title: string;
  isCurrent: boolean;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ id, title, isCurrent }) => {

  const context = useAppContext();
  if (!context) return null;
  const { state, dispatch } = context;

  const handleSelectTodo = (id: string, dispatch: any) => {
    dispatch({ type: 'SELECT', id: id });
  }

  return (
    <>
      { state.mode === 'view' &&
        <div
          className={`todo-select active ${isCurrent ? ' todo-current' : ''}`}
          onClick={() => handleSelectTodo(id, dispatch)}
        >
          {`${title}`}
        </div>
      }
      { state.mode === 'edit' &&
        <div
          className={`todo-select disabled ${isCurrent ? ' todo-current' : ''}`}
        >
          {`${title}`}
        </div>
      }
    </>
  );
}

export default TodoListItem;
