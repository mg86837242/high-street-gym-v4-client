import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/inter';
import '@fontsource/righteous';
import '@fontsource/permanent-marker';
import { isProd } from './data/constants';
import AppProviders from './components/AppProviders';

ReactDOM.createRoot(document.getElementById('root')).render(
  isProd ? (
    <AppProviders />
  ) : (
    <React.StrictMode>
      <AppProviders />
    </React.StrictMode>
  )
);
