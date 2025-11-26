# Plan 1: Todo Application with Authentication and Mock Accounts

## Overview
This plan sets up a basic React Todo application with client-side mock authentication and todo management. It leverages the existing React template with Vite, TypeScript, and Tailwind CSS. The authentication system uses in-memory mock user data, and the todo list functionality uses in-memory mock todo data, eliminating the need for a backend API in this initial phase. The application features login, registration, a protected dashboard, and CRUD operations for todos.

## Files Created
*   `src/types/auth.ts`: Defines `User` and `AuthCredentials` TypeScript interfaces for authentication data.
*   `src/types/todo.ts`: Defines `Todo`, `NewTodo`, and `UpdateTodo` TypeScript interfaces for todo items.
*   `src/utils/auth-utils.ts`: Contains mock user data (`mockUsers` array), `findUser` to simulate user lookup, and `addUser` to simulate user registration. These are in-memory operations.
*   `src/utils/todo-utils.ts`: Contains mock todo data (`mockTodos` array), `getTodosByUserId`, `addTodo`, `updateTodo`, and `deleteTodo` functions for in-memory todo management.
*   `src/services/authService.ts`: Provides asynchronous `login`, `register`, `logout`, and `getCurrentUser` functions, simulating API calls with `setTimeout` and interacting with `auth-utils.ts`. Uses `localStorage` for mock session persistence.
*   `src/services/todoService.ts`: Provides asynchronous `getAllTodos`, `createTodo`, `toggleTodoComplete`, and `removeTodo` functions, simulating API calls with `setTimeout` and interacting with `todo-utils.ts`.
*   `src/hooks/useAuth.tsx`: Implements an `AuthContext`, `AuthProvider` component, and `useAuth` custom hook to manage global authentication state (user, loading, error, login/logout/register actions). Handles initial user loading and state updates.
*   `src/components/AuthLayout.tsx`: A reusable layout component for authentication pages, providing centered content with a modern card-like design using Tailwind CSS.
*   `src/components/AuthForm.tsx`: A reusable form component for both login and registration, handling username/password input, submission, loading states, and error display. Utilizes the existing `Button` component.
*   `src/pages/LoginPage.tsx`: The login page, integrating `AuthLayout`, `AuthForm`, and `useAuth`. Redirects authenticated users to the dashboard and includes a link to the registration page.
*   `src/pages/RegisterPage.tsx`: The registration page, integrating `AuthLayout`, `AuthForm`, and `useAuth`. Redirects authenticated users to the dashboard and includes a link to the login page.
*   `src/components/TodoItem.tsx`: A component to display a single todo item, including toggle complete functionality, a delete button, and conditional styling for completion status. Utilizes the existing `Button` component.
*   `src/components/TodoList.tsx`: A component to render a list of `TodoItem` components, handling an empty state message.
*   `src/components/TodoForm.tsx`: An input form component to add new todo items, including input validation, loading states, and utilizing the existing `Button` component.
*   `src/pages/DashboardPage.tsx`: The main protected page for authenticated users, fetching and managing todos, and integrating `TodoForm` and `TodoList`. Handles loading and error states for todos.
*   `src/components/ProtectedRoute.tsx`: A component to protect routes, ensuring that only authenticated users can access nested routes, redirecting to '/login' if not authenticated.

## Files Modified
*   `src/components/layout/Header.tsx`: Updated to include dynamic navigation links based on authentication status (Login/Register if not authenticated, Dashboard/Logout if authenticated). Displays current username and uses the `Button` component for logout.
*   `src/components/layout/Footer.tsx`: Updated with a simple copyright notice.
*   `src/App.tsx`: Refactored to wrap the application with `AuthProvider` and configured `react-router-dom` routes. Includes public routes for '/', '/login', '/register', and a protected route for '/dashboard' using `ProtectedRoute`. The original welcome content has been removed.
*   `src/pages/Home.tsx`: Content updated to serve as a simple welcome page, directing users to login/register or the dashboard based on their authentication status.

## Dependencies Added
No new external dependencies were added in this plan, as existing `react-router-dom` and the custom services/hooks are used for mock backend functionality.

## Architecture Decisions
*   **Mock Backend:** All authentication and todo logic is handled in-memory within `src/utils` and wrapped by `src/services` to simulate API calls. This allows full frontend development without a real backend.
*   **Authentication Context:** A global `AuthContext` is used via `useAuth.tsx` to manage and provide authentication state throughout the application, ensuring easy access to user information and auth actions.
*   **Protected Routes:** A `ProtectedRoute` component ensures that sensitive routes like the dashboard are only accessible to authenticated users, enhancing security.
*   **Reusable Components:** `AuthLayout`, `AuthForm`, `TodoItem`, `TodoList`, and `TodoForm` were created as reusable components to promote modularity and maintainability.
*   **Type Safety:** Comprehensive TypeScript interfaces are defined in `src/types` to ensure strong type checking across the application.
*   **Tailwind CSS & Mobile-First:** All new and modified components use Tailwind CSS with a mobile-first approach, ensuring responsiveness across different screen sizes.

## Next Steps
Future plans could focus on enhancing the UI/UX, implementing persistent storage beyond `localStorage` (e.g., a real backend API integration), adding more features to the todo list (e.g., filtering, sorting, due dates), or introducing unit and integration tests.