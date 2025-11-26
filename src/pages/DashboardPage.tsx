import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { useAuth } from '@/hooks/useAuth';
import { getAllTodos, createTodo, toggleTodoComplete, removeTodo } from '@/services/todoService';
import type { Todo } from '@/types/todo';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true);
  const [isAddingTodo, setIsAddingTodo] = useState<boolean>(false);
  const [loadingItemIds, setLoadingItemIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const fetchTodos = useCallback(async () => {
    if (user?.id) {
      setIsLoadingTodos(true);
      setError(null);
      try {
        const fetchedTodos = await getAllTodos(user.id);
        setTodos(fetchedTodos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      } finally {
        setIsLoadingTodos(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = useCallback(async (title: string) => {
    if (!user?.id) return;
    setIsAddingTodo(true);
    setError(null);
    try {
      const newTodo = await createTodo({ title, userId: user.id });
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    } finally {
      setIsAddingTodo(false);
    }
  }, [user]);

  const handleToggleComplete = useCallback(async (id: string, completed: boolean) => {
    setLoadingItemIds((prev) => new Set(prev).add(id));
    setError(null);
    try {
      const updatedTodo = await toggleTodoComplete(id, completed);
      if (updatedTodo) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    } finally {
      setLoadingItemIds((prev) => { const newSet = new Set(prev); newSet.delete(id); return newSet; });
    }
  }, []);

  const handleDeleteTodo = useCallback(async (id: string) => {
    setLoadingItemIds((prev) => new Set(prev).add(id));
    setError(null);
    try {
      const success = await removeTodo(id);
      if (success) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    } finally {
      setLoadingItemIds((prev) => { const newSet = new Set(prev); newSet.delete(id); return newSet; });
    }
  }, []);

  const isLoadingItem = useCallback((id: string) => loadingItemIds.has(id), [loadingItemIds]);

  if (authLoading || isLoadingTodos) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-64px)] dark:text-white'>
        Loading todos...
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl'>
      <h1 className='text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6'>
        Welcome, {user?.username}!
      </h1>
      <p className='text-center text-gray-700 dark:text-gray-300 mb-8'>
        Here are your tasks for today.
      </p>

      {error && (
        <p className='text-red-500 text-center mb-4'>
          Error: {error}
        </p>
      )}

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
          Your Todos
        </h2>
        <TodoForm onAdd={handleAddTodo} isLoading={isAddingTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
          isLoadingItem={isLoadingItem}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
