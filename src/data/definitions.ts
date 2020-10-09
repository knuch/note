
export interface Todo {
  id: string;
  title: string;
  text: string;
  completed: boolean;
}

export interface State {
  todos: Array<Todo>;
  currentTodo?: Todo
  mode: string;
}

export type Action =
  | { type: 'VIEW' }
  | { type: 'NEW' }
  | { type: 'EDIT' }
  | { type: 'SAVE', todo: Todo }
  | { type: 'SELECT', id: string }
  | { type: 'DELETE', id: string }
