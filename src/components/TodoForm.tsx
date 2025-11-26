import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';

interface TodoFormProps {
  onAdd: (title: string) => void;
  isLoading: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, isLoading }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-2 mt-4'>
      <input
        type='text'
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder='Add a new todo'
        className='flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
        disabled={isLoading}
      />
      <Button type='submit' variant='primary' size='md' className='w-full sm:w-auto' disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Todo'}
      </Button>
    </form>
  );
};
