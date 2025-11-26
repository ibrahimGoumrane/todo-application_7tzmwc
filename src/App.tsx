import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/hooks/useAuth';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import NotFound from '@/pages/NotFound'; // Keep existing NotFound
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Home from '@/pages/Home'; // Keep existing Home, but modify its content to be a simple welcome

function App() {
  return (
    <AuthProvider>
      <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900'>
        <Header />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<DashboardPage />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
