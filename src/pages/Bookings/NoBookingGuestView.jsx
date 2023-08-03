export default function NoBookingGuestView() {
  return (
    <div
      id='empty-list-wrapper'
      className='col-[1_/_2] row-[2_/_4] grid w-full place-items-center lg:sticky lg:top-28 lg:col-[2_/_4] lg:row-[1_/_2] lg:min-h-[80vh]'
    >
      <p className='text-lg'>😢 No booking found on this date.</p>
    </div>
  );
}
