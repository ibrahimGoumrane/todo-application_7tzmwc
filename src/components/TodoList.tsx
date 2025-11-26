import React from 'react';
import { TodoItem } from '@/components/TodoItem';
import type { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isLoadingItem?: (id: string) => boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete, isLoadingItem = () => false }) => {
  if (todos.length === 0) {
    return (
      <p className='text-center text-gray-600 dark:text-gray-400 mt-8'>
        No todos yet! Add some above.
      </p>
    );
  }

  return (
    <ul className='space-y-2 mt-4'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          isLoading={isLoadingItem(todo.id)}
        />
      ))}
    </ul>
  );
};
