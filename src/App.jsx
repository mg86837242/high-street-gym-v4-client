import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ColorModeProvider } from './context/ColorModeProvider';
import routes from './routes';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <ColorModeProvider>
      <AuthProvider router={router}>
        <RouterProvider router={router} fallbackElement={<p>Performing initial data load</p>} />{' '}
      </AuthProvider>
    </ColorModeProvider>
  );
}
