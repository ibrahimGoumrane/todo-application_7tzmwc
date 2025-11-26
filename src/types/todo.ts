export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export type NewTodo = Pick<Todo, 'title' | 'userId'>;
export type UpdateTodo = Partial<Pick<Todo, 'title' | 'completed'>>;
