import { createBrowserRouter, Link } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorInfo from '../components/ErrorInfo';
import PageLayout from '../pages/PageLayout';
import bookingsRoutes from '../routes/bookingsRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    ErrorBoundary: ErrorInfo,
  },
  {
    Component: PageLayout,
    ErrorBoundary: ErrorInfo,
    children: [
      {
        path: 'blogs',
        lazy: () => import('../pages/Blogs'),
        ErrorBoundary: ErrorInfo,
      },
      {
        path: 'bookings',
        lazy: () => import('../pages/Bookings'),
        ErrorBoundary: ErrorInfo,
        handle: { crumb: () => <Link to='/bookings'>Calendar</Link> },
        children: [...bookingsRoutes],
      },
      {
        path: 'activities',
        lazy: () => import('../pages/Activities'),
        ErrorBoundary: ErrorInfo,
      },
      {
        path: 'admin',
        lazy: () => import('../pages/Admin'),
        ErrorBoundary: ErrorInfo,
      },
    ],
  },
  {
    path: 'login',
    lazy: () => import('../pages/Login'),
    ErrorBoundary: ErrorInfo,
  },
  {
    path: '/signup',
    // ??? MUST be named export for both `loader` and `Component` files, o/w dynamic import won't work, speculated to be issues related to resolver
    lazy: () => import('../pages/Signup'),
    async loader() {
      let { default: loader } = await import('../routes/signup-loader');
      return loader();
    },
    async action({ request }) {
      let { default: action } = await import('../routes/signup-action');
      return action({ request });
    },
    ErrorBoundary: ErrorInfo,
  },
  {
    path: '/profile',
    lazy: () => import('../pages/Profile'),
    ErrorBoundary: ErrorInfo,
  },
]);

export default router;

// References:
// -- https://reactrouter.com/en/main/start/concepts#defining-routes: Official example of defining routes with React
//  Router
// -- https://reactrouter.com/en/main/start/concepts#rendering: Official recommended usage of outlets, index routes and
//  render routes
// -- https://github.com/remix-run/react-router/releases/tag/react-router%406.9.0: Official recommended way of
//  modularizing routes, which also implies routes are just JSOn
// -- https://stackoverflow.com/questions/74443583/getting-error-with-createbrowserrouter-usenavigate-may-be-used-only-in-the-co:
//  How to render provider component when using React Router 6.4+ (pay attention to the comment section's sandbox)

// NB Error: `[vite] hmr invalidate /src/pages/BookingList.jsx Could not Fast Refresh. Learn more at
//  https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports` =>
//  Consistent components exports rule conflicts with React Router tutorial's design pattern by which the loader is
//  declared and exported on the same page as its associated component => further dig indicates that Vite has some
//  compatibility issue with React's context => Solution: (1) declare loader function in the `router.jsx`, not doing
//  this b/c lazy loading is in use, (2) declare loader function in a separate file
