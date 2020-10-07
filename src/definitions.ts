
export interface iTodo {
  id: string;
  title: string;
  text: string;
  completed: boolean;
}

export interface iState {
  todos: Array<iTodo>;
  mode: string;
}

export type tAction =
  | { type: 'VIEW' }
  | { type: 'NEW' }
  | { type: 'EDIT', todo: iTodo }
  | { type: 'SAVE', todo: iTodo }
  | { type: 'DELETE', id: string }
