import { nanoid } from 'nanoid';
import { tAction, iState } from './definitions';

export const todosReducer = (state: iState, action: tAction): iState => {
  switch (action.type) {
    case 'EDIT':
      return { ...state, mode: 'edit' };
    case 'NEW':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: nanoid(),
            title: '',
            text: '',
            completed: false
          }
        ]
      };
    case 'VIEW':
      return { ...state, mode: 'view' };
    case 'SAVE':
      return {
        ...state,
        todos: state.todos.splice(
          state.todos.findIndex(todo => todo.id === action.todo.id),
          1,
          action.todo
        )
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id === action.id)
      };
    default:
      throw new Error(`Invalid action passed to todosReducer: ${action}`)
  }
};
