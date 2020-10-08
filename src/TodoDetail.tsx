import React, { useState, useEffect } from 'react';
import { Todo } from './definitions';
import { useAppContext } from './context';

interface TodoDetailProps {
  todo: Todo,
  mode: string
}

const TodoListItem: React.FC<TodoDetailProps> = ({ todo, mode }) => {

  const context = useAppContext();
  const [tempTodo, setTempTodo] = useState({ ...todo });

  useEffect(() => {
    setTempTodo({ ...todo })
  }, [todo]);

  if (!context) return null;

  const handleTitleChange = (e: any) => {
    setTempTodo({ ...tempTodo, title: e.target.value })
  }

  const handleTextChange = (e: any) => {
    setTempTodo({ ...tempTodo, text: e.target.value })
  }

  return (
    <>
      <div className="head">
        {mode === 'view' && <div>{tempTodo.title}</div>}
        {mode === 'edit' && (
          <input type="text" value={tempTodo.title} onChange={handleTitleChange} />
        )}

      </div>
      <div className="content">
        {mode === 'view' && tempTodo.text}
        {mode === 'edit' && (
          <textarea value={tempTodo.text} onChange={handleTextChange} />
        )}

      </div>
      <div className="controls">
        {
          mode === 'view'
            ? <button onClick={() => context.dispatch({ type: 'EDIT' })}>Edit</button>
            : (
              <>
                <button onClick={() => context.dispatch({ type: 'VIEW' })}>Cancel</button>
                <button onClick={() => context.dispatch({ type: 'SAVE', todo: tempTodo })}>Save</button>
                <button onClick={() => context.dispatch({ type: 'DELETE', id: tempTodo.id })}>Delete</button>
              </>
            )
        }
      </div>
    </>
  );
}

export default TodoListItem;
