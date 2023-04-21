import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/inter';
import '@fontsource/righteous';
import '@fontsource/permanent-marker';
import { isProd } from './data/constants';
import AuthProvider from './components/AuthProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  isProd ? (
    <AuthProvider>
      <App />
    </AuthProvider>
  ) : (
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  )
);
