import { useLoaderData, Form } from "react-router-dom";
import { monthNames, getOrdinal } from "../../utils/mapDates";

export default function BookingDetails() {
  const {
    booking: {
      id,
      dateTime,
      memberFirstName,
      memberLastName,
      memberPhone,
      memberEmail,
      trainerFirstName,
      trainerLastName,
      trainerPhone,
      trainerEmail,
      activityName,
      category,
      description,
      intensityLevel,
      requirementOne,
      requirementTwo,
      durationMinutes,
      price,
    },
  } = useLoaderData();

  return (
    <div
      id="booking-details-wrapper"
      className="grid content-start w-full justify-items-center col-[1_/_2] row-[3_/_4] lg:col-[3_/_4] lg:row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28"
    >
      <div
        id="booking-details-table"
        role="table"
        aria-label="Table containing booking detail information"
        aria-rowcount="19"
        className="flex flex-col w-full gap-2 px-4 pt-2 pb-4 rounded-lg 3xl:gap-5 bg-base-300 max-w-[22rem] lg:max-w-[30rem] xl:px-6 3xl:pt-4"
      >
        <h1 className="text-center text-secondary max-3xl:mb-0">Booking Details</h1>
        <div className="grid grid-cols-[minmax(1rem,_2fr)_minmax(2rem,_3fr)] text-sm 3xl:text:base">
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Booking ID: </p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">{id}</p>
          <p className="px-1 py-0.5 3xl:py-1">Date:</p>
          <p className="px-1 py-0.5 3xl:py-1">
            {dateTime.slice(8, 9) === "0" ? dateTime.slice(9, 10) : dateTime.slice(8, 10)}
            {getOrdinal(dateTime.slice(8, 10))} {monthNames[Number(dateTime.slice(5, 7))]} {dateTime.slice(0, 4)}
          </p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Time:</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">{dateTime.slice(-8)}</p>
          <p className="px-1 py-0.5 3xl:py-1">Activity:</p>
          <p className="px-1 py-0.5 3xl:py-1">{activityName}</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Category:</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">{category}</p>
          <p className="px-1 py-0.5 3xl:py-1">Description:</p>
          <p className="px-1 py-0.5 3xl:py-1">{description}</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Intensity Level:</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">{intensityLevel}</p>
          <p className="px-1 py-0.5 3xl:py-1">Requirement:</p>
          <p className="px-1 py-0.5 3xl:py-1">{requirementOne}</p>
          <p className="px-1 py-0.5 3xl:py-1"></p>
          <p className="px-1 py-0.5 3xl:py-1">{requirementTwo}</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Duration:</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">{durationMinutes} minutes</p>
          <p className="px-1 py-0.5 3xl:py-1">Price:</p>
          <p className="px-1 py-0.5 3xl:py-1">$ {price}</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Member:</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">
            {memberFirstName} {memberLastName}
          </p>
          <p className="px-1 py-0.5 3xl:py-1">Phone:</p>
          <p className="px-1 py-0.5 3xl:py-1">{memberPhone}</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Email:</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">{memberEmail}</p>
          <p className="px-1 py-0.5 3xl:py-1">Trainer:</p>
          <p className="px-1 py-0.5 3xl:py-1">
            {trainerFirstName} {trainerLastName}
          </p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">Phone:</p>
          <p className="px-1 bg-base-100 py-0.5 3xl:py-1">{trainerPhone}</p>
          <p className="px-1 py-0.5 3xl:py-1">Email:</p>
          <p className="px-1 py-0.5 3xl:py-1">{trainerEmail}</p>
        </div>
        <div className="flex justify-between gap-5 text-center">
          <Form action="edit">
            <button className="h-10 min-h-0 normal-case shadow btn btn-secondary text-primary-content shadow-black/50 w-36 lg:w-[6.5rem] xl:w-36">
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(e) => {
              // TODO Convert to a modal dialog, see: https://react.dev/reference/react/useEffect#connecting-to-an-external-system
              if (!confirm("Please confirm you want to delete this booking.")) {
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="h-10 min-h-0 normal-case shadow btn glass bg-base-100 text-accent-content shadow-black/50 w-36 lg:w-[6.5rem] xl:w-36"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
