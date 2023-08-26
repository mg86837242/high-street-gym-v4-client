import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/inter';
import '@fontsource/righteous';
import '@fontsource/permanent-marker';

import { AuthProvider } from './context/AuthContext';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
