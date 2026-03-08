import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import { UserProvider } from './context/user-context';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Montserrat', sans-serif;
          background-color: #0B0B0F;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0B0B0F;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #FF4D00;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #FF6A00;
        }
      `}</style>

      <UserProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors closeButton />
      </UserProvider>
    </>
  );
}