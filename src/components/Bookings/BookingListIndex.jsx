import { Link } from "react-router-dom";

export default function BookingListIndex() {
  return (
    <div
      id="booking-list-wrapper"
      className="lg:grid lg:place-items-center col-[1_/_2] row-[2_/_3] lg:col-[2_/_3] lg:row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28"
    >
      <p className="text-lg text-center">
        👈 Click a date to see a list of bookings, if any, on that date (for example, 7th Mar 2023), or{" "}
        <Link to="new" className="link link-primary">
          create a new booking
        </Link>
        .
      </p>
    </div>
  );
}
