export const Footer = () => {
  return (
    <footer className='bg-gray-100 dark:bg-gray-900 p-4 mt-8 shadow-inner'>
      <div className='container mx-auto text-center text-sm text-gray-600 dark:text-gray-400'>
        <p>&copy; {new Date().getFullYear()} Todo Application. All rights reserved.</p>
      </div>
    </footer>
  );
};
