import { addTodo as utilAddTodo, deleteTodo as utilDeleteTodo, getTodosByUserId as utilGetTodosByUserId, updateTodo as utilUpdateTodo } from '@/utils/todo-utils';
import type { Todo, NewTodo, UpdateTodo } from '@/types/todo';

export const getAllTodos = (userId: string): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(utilGetTodosByUserId(userId));
    }, 300);
  });
};

export const createTodo = (newTodo: NewTodo): Promise<Todo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(utilAddTodo(newTodo));
    }, 300);
  });
};

export const toggleTodoComplete = (id: string, completed: boolean): Promise<Todo | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(utilUpdateTodo(id, { completed }));
    }, 300);
  });
};

export const removeTodo = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(utilDeleteTodo(id));
    }, 300);
  });
};
