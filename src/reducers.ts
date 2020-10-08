import { nanoid } from 'nanoid';
import { Action, State } from './definitions';

export const todosReducer = (state: State, action: Action): State => {
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
            title: 'My new node title',
            text: '',
            completed: false
          }
        ]
      };
    case 'VIEW':
      return { ...state, mode: 'view' };
    case 'SAVE':
      const newTodos = [...state.todos];
      newTodos.splice(
        state.todos.findIndex(todo => todo.id === action.todo.id),
        1,
        action.todo
      )
      return {
        ...state,
        todos: newTodos,
        mode: 'view'
      };
    case 'DELETE':
      const newState = { ...state, mode: 'view' }
      if (state.currentTodo && state.currentTodo.id === action.id) {
        newState.currentTodo = undefined;
      }
      newState.todos = state.todos.filter(todo => todo.id !== action.id);
      return newState;
    case 'SELECT':
      return {
        ...state,
        currentTodo: state.todos.find(todo => todo.id === action.id)
      };
    default:
      throw new Error(`Invalid action passed to todosReducer`)
  }
};
