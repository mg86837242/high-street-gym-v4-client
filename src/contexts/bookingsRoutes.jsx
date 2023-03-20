import { Link } from 'react-router-dom';
import ErrorInfo from '../components/ErrorInfo';
import BookingListIndex from '../components/Bookings/BookingListIndex';
import BookingDetailsIndex from '../components/Bookings/BookingDetailsIndex';

const bookingsRoutes = [
  { index: true, Component: BookingListIndex },
  {
    path: ':date',
    lazy: () => import('../components/Bookings/BookingList'),
    ErrorBoundary: ErrorInfo,
    async loader({ params }) {
      let { getBookingsByDate } = await import('../services/bookings');
      return getBookingsByDate({ params });
    },
    handle: {
      // The shape of arguments passed into the below `crumb` method, which returns a render function, will affect the
      //  shape of arguments passed into the `map()` method when calling `useMatches` and defining `crumbs`; also the
      //  name of the method below can be anything, e.g., `breadcrumb`.
      crumb: (params, data) => {
        // In the API endpoint from which the `data` is fetched, 404 is designed to return an empty array called
        // `bookings` (i.e., the length is 0), o/w `data?.bookings` wouldn't exist and the following render function
        //  would render 'Error' text although 404 won't trigger an error in the loader (per the programmer's design);
        //  alternatively, in the API endpoint, don't throw 404 when the `bookings` array is empty
        return data?.bookings ? (
          <Link to={`/bookings/${params.date}`}>No. of Bookings: {data.bookings.length}</Link>
        ) : (
          'Error'
        );
      },
    },
    children: [
      { index: true, Component: BookingDetailsIndex },
      {
        path: 'id/:id',
        lazy: () => import('../components/Bookings/BookingDetails'),
        ErrorBoundary: ErrorInfo,
        async loader({ params }) {
          let { getBookingById } = await import('../services/bookings');
          return getBookingById({ params });
        },
        handle: {
          crumb: (params, data) =>
            data?.booking ? (
              <Link to={`/bookings/${params.date}/id/${params.id}`}>Booking ID: {params.id}</Link>
            ) : (
              'Error'
            ),
        },
      },
      {
        path: 'id/:id/edit',
        lazy: () => import('../components/Bookings/BookingEdit'),
        ErrorBoundary: ErrorInfo,
        async loader({ params }) {
          let { getBookingAndOptionsById } = await import('../services/bookings');
          return getBookingAndOptionsById({ params });
        },
        async action({ params, request }) {
          let { updateBookingById } = await import('../services/bookings');
          return updateBookingById({ params, request });
        },
        handle: {
          crumb: (params, data) =>
            data?.booking ? (
              <Link to={`/bookings/${params.date}/id/${params.id}/edit`}>Booking ID: {params.id}</Link>
            ) : (
              'Error'
            ),
        },
      },
      {
        path: 'id/:id/destroy',
        ErrorBoundary: ErrorInfo,
        async action({ params }) {
          let { deleteBookingById } = await import('../services/bookings');
          return deleteBookingById({ params });
        },
      },
    ],
  },
  {
    path: 'new',
    lazy: () => import('../components/Bookings/BookingNew'),
    ErrorBoundary: ErrorInfo,
    async loader() {
      let { getAllBookingOptions } = await import('../services/bookings');
      return getAllBookingOptions();
    },
    async action({ request }) {
      let { createBooking } = await import('../services/bookings');
      return createBooking({ request });
    },
    handle: { crumb: () => <Link to='/bookings/new'>New Booking</Link> },
  },
];

export default bookingsRoutes;
