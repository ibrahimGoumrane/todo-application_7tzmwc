import React from 'react';
import { Button } from '@/components/ui/Button';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean; // For individual item loading states
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, isLoading = false }) => {
  return (
    <li className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm mb-2'>
      <div className='flex items-center flex-grow'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, !todo.completed)}
          className='mr-3 h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500'
          disabled={isLoading}
        />
        <span className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
          {todo.title}
        </span>
      </div>
      <Button
        variant='secondary'
        size='sm'
        onClick={() => onDelete(todo.id)}
        className='ml-4 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white'
        disabled={isLoading}
      >
        Delete
      </Button>
    </li>
  );
};
