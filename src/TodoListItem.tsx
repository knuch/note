import React from 'react';

interface TodoListItemProps {
  id: string
  text: string;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ id, text }) => {
  return (
    <div>
      {`Id: ${id} - ${text}`}
    </div>
  );
}

export default TodoListItem;
