import type { Todo, NewTodo, UpdateTodo } from '@/types/todo';

let mockTodos: Todo[] = [
  { id: 'todo-1', title: 'Learn React', completed: false, userId: 'user-1' },
  { id: 'todo-2', title: 'Build a Todo App', completed: true, userId: 'user-1' },
  { id: 'todo-3', title: 'Deploy to Netlify', completed: false, userId: 'user-1' },
  { id: 'todo-4', title: 'Walk the dog', completed: false, userId: 'user-2' },
  { id: 'todo-5', title: 'Buy groceries', completed: true, userId: 'user-2' },
];

export const getTodosByUserId = (userId: string): Todo[] => {
  return mockTodos.filter((todo) => todo.userId === userId);
};

export const addTodo = (newTodo: NewTodo): Todo => {
  const todo: Todo = {
    id: `todo-${mockTodos.length + 1}`,
    ...newTodo,
    completed: false,
  };
  mockTodos.push(todo);
  return todo;
};

export const updateTodo = (id: string, updates: UpdateTodo): Todo | undefined => {
  const todoIndex = mockTodos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    mockTodos[todoIndex] = { ...mockTodos[todoIndex], ...updates };
    return mockTodos[todoIndex];
  }
  return undefined;
};

export const deleteTodo = (id: string): boolean => {
  const initialLength = mockTodos.length;
  mockTodos = mockTodos.filter((todo) => todo.id !== id);
  return mockTodos.length < initialLength;
};
