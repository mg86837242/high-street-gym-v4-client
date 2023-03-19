import { createBrowserRouter, Link } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorInfo from '../components/ErrorInfo';
import PageLayout from '../pages/PageLayout';
import Blogs from '../pages/Blogs';
import Bookings from '../pages/Bookings';
import bookingsRoutes from './routes/bookingsRoutes';
import Profile from '../pages/Profile';
import NoFoundView from '../components/NoFoundView';

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
  // {
  //   path: 'login',
  //   Component: NoFoundView,
  //   ErrorBoundary: ErrorInfo,
  // },
  {
    path: '/profile',
    Component: Profile,
    ErrorBoundary: ErrorInfo,
  },
]);

export default router;
