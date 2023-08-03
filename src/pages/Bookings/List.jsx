import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData } from 'react-router-dom';
import BookingListMemberView from './BookingListMemberView';
import BookingListTrainerView from './BookingListTrainerView';
import BookingListAdminView from './BookingListAdminView';
import BookingListGuestView from './BookingListGuestView';
import NoBookingAdminView from './NoBookingAdminView';
import NoBookingGuestView from './NoBookingGuestView';

export default function List() {
  const auth = useContext(AuthContext);
  const { bookings } = useLoaderData();

  // PS DA `auth.user` to `{ role, memberId, trainerId }` will break the code b/c there's a state in which
  //  `auth.user` is not populated
  switch (auth.user?.role) {
    case 'Member':
      return <BookingListMemberView bookings={bookings} authUserMemberId={auth.user?.memberId} />;
    case 'Trainer':
      return <BookingListTrainerView bookings={bookings} authUserTrainerId={auth.user?.trainerId} />;
    case 'Admin':
      if (bookings?.length) {
        return <BookingListAdminView bookings={bookings} />;
      } else {
        return <NoBookingAdminView />;
      }
    default:
      if (bookings?.length) {
        return <BookingListGuestView bookings={bookings} />;
      } else {
        return <NoBookingGuestView />;
      }
  }
}
