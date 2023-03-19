import { createBrowserRouter, Link } from 'react-router-dom';
import { API_URL } from '../data/constants';
import fetchRes from '../utils/fetchRes';
import Home from '../pages/Home';
import ErrorInfo from '../components/ErrorInfo';
import PageLayout from '../pages/PageLayout';
import Blogs from '../pages/Blogs';
import Bookings from '../pages/Bookings';
import bookingsRoutes from './routes/bookingsRoutes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import signupAction from './actions/signupAction';
import NoFoundView from '../components/NoFoundView';

// NB Error: `[vite] hmr invalidate /src/pages/BookingList.jsx Could not Fast Refresh. Learn more at
//  https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports` =>
//  Consistent components exports rule conflicts with React Router tutorial's design pattern by which the loader is
//  declared and exported on the same page as its associated component => further dig indicates that Vite has some
//  compatibility issue with React's context => Solution: declare loader function in the `RouterContext`.
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
        Component: Blogs,
        ErrorBoundary: ErrorInfo,
      },
      {
        path: 'bookings',
        Component: Bookings,
        ErrorBoundary: ErrorInfo,
        handle: { crumb: () => <Link to='/bookings'>Calendar</Link> },
        children: [...bookingsRoutes],
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
    ErrorBoundary: ErrorInfo,
  },
  {
    path: '/signup',
    Component: Signup,
    ErrorBoundary: ErrorInfo,
    async loader() {
      const response = await fetchRes(`${API_URL}/logins/emails`);
      return response;
    },
    action: signupAction,
  },
  // {
  //   path: 'profile',
  //   Component: NoFoundView,
  //   ErrorBoundary: ErrorInfo,
  // },
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
