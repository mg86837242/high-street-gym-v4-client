import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/inter';
import '@fontsource/righteous';
import '@fontsource/permanent-marker';
import { isProd } from './data/constants';
import AuthProvider from './components/AuthProvider';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  isProd ? (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  ) : (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  )
);
