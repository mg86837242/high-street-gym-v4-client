import { Link } from 'react-router-dom';

export default function ListIndex() {
  return (
    <div
      id='booking-list-wrapper'
      className='col-[1_/_2] row-[2_/_3] lg:sticky lg:top-28 lg:col-[2_/_3] lg:row-[1_/_2] lg:grid lg:min-h-[80vh] lg:place-items-center'
    >
      <p className='text-center text-lg'>
        👈 Click a date to see a list of bookings, if any, on that date (for example, 28th Apr 2023), or{' '}
        <Link to='new' className='link-primary link'>
          create a new booking
        </Link>
        .
      </p>
    </div>
  );
}
