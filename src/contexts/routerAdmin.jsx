import { createBrowserRouter, Link } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorInfo from '../components/ErrorInfo';
import PageLayout from '../pages/PageLayout';
import Blogs from '../pages/Blogs';
import Bookings from '../pages/Bookings';
import bookingsRoutes from './routes/bookingsRoutes';
import Activities from '../pages/Activities';
import Admin from '../pages/Admin';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import signupAction from './actions/signupAction';
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
      {
        path: 'activities',
        Component: Activities,
        ErrorBoundary: ErrorInfo,
      },
      {
        path: 'admin',
        Component: Admin,
        ErrorBoundary: ErrorInfo,
      },
    ],
  },
  {
    path: 'login',
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
  {
    path: '/profile',
    Component: Profile,
    ErrorBoundary: ErrorInfo,
  },
]);

export default router;
