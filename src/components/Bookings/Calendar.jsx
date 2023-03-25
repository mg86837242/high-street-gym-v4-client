import { useState, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { today } from '../../data/keyDates';
import { monthNames, dayNames } from '../../utils/mapDates';

export default function Calendar() {
  // NB The following 2 states are just snapshots of date when this component is rendered, i.e., can be updated by
  //  setter, however, won't update according to the real time unless with `useEffect`
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const monthStartDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const calendarCells = useMemo(
    () =>
      [...Array(7)].map((_, i) =>
        i < 1 ? (
          <div
            id='calendar-header-row'
            key={`r${i}`}
            className='grid grid-cols-7 gap-2 px-2 pt-2 rounded-t-lg 3xl:gap-4 2xl:px-4 3xl:px-6 3xl:pt-4 text-primary-content bg-primary'
          >
            {[...Array(7)].map((_, j) => (
              <div
                id='calendar-header-cell'
                key={j}
                className='grid min-h-0 leading-none place-items-center w-11 h-11 3xl:w-12 3xl:h-12 sm:text-base'
              >
                {dayNames[j]}
              </div>
            ))}
          </div>
        ) : (
          <div
            id='calendar-row'
            key={`r${i}`}
            className={`grid grid-cols-7 gap-2 px-2 3xl:gap-4 2xl:px-4 3xl:px-6 ${i > 5 && 'pb-2 3xl:pb-4'}`}
          >
            {[...Array(7)].map((_, j) => {
              const dayOnCal = i * 7 + j - 6 - monthStartDay;
              return dayOnCal > 0 && dayOnCal <= daysInMonth ? (
                <NavLink
                  to={`${year}-${month < 10 ? '0' + month : month}-${dayOnCal < 10 ? '0' + dayOnCal : dayOnCal}`}
                  id='calendar-cell'
                  tabIndex={0}
                  key={i * 10 + j}
                  className={({ isActive, isPending }) =>
                    `grid place-items-center w-11 h-11 3xl:w-12 3xl:h-12 min-h-0 sm:text-base leading-none btn btn-circle ${
                      isActive && 'btn-primary'
                    } ${isPending && 'loading'}`
                  }
                >
                  {dayOnCal}
                </NavLink>
              ) : (
                <div
                  id='calendar-cell-no-date'
                  key={i * 10 + j}
                  className='grid min-h-0 leading-none place-items-center w-11 h-11 xl:w-12 xl:h-12 sm:text-base'
                ></div>
              );
            })}
          </div>
        )
      ),
    [year, month, monthStartDay, daysInMonth]
  );

  return (
    <div
      id='calendar-wrapper'
      className='grid justify-items-center content-start w-full lg:w-fit gap-3 3xl:gap-6 col-[1_/_2] row-[1_/_2] lg:min-h-[80vh] lg:sticky lg:top-28 lg:justify-self-end'
    >
      <div id='calendar-nav' className='flex items-center gap-10 px-3 rounded-lg lg:gap-20 bg-base-300 py-[.25rem]'>
        <button
          // NB Bug: random texts get selected/highlighted => b/c the `<FontAwesomeIcon>` is a text element =>
          //  Solution: wrap up the `<FontAwesomeIcon>` within a button element
          tabIndex={0}
          onClick={() => {
            month === 1 ? (setYear((year) => year - 1), setMonth(12)) : setMonth((month) => month - 1);
          }}
        >
          <FontAwesomeIcon icon={faSquareCaretLeft} className='text-2xl cursor-pointer md:text-3xl' />
        </button>
        <div id='selected-yy-mm-wrapper' className='flex flex-col items-center'>
          <p id='selected-yy' className='sm:text-lg'>
            {year}
          </p>
          <p id='selected-mm' className='sm:text-lg'>
            {monthNames[month]}
          </p>
        </div>
        <button
          tabIndex={0}
          onClick={() => {
            month === 12 ? (setYear((year) => year + 1), setMonth(1)) : setMonth((month) => month + 1);
          }}
        >
          <FontAwesomeIcon icon={faSquareCaretRight} className='text-2xl cursor-pointer md:text-3xl' />
        </button>
      </div>
      <div
        id='calendar-content'
        role='table'
        aria-label='Dynamic calendar containing booking information'
        aria-colcount='7'
        className='flex flex-col gap-2 rounded-lg 3xl:gap-4 bg-base-300'
      >
        {calendarCells}
      </div>
      <CreateNewBooking />
    </div>
  );
}

function CreateNewBooking() {
  return (
    <section className='flex justify-center gap-5 text-center'>
      <Link to='new' className='w-48 min-h-0 normal-case shadow btn btn-primary text-primary-content shadow-black/50'>
        Create New Booking
      </Link>
    </section>
  );
}

// References for JS dates:
// -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#examples: (1) `Date()` constructor, (2) instance methods for local time, namely 'getFullYear()`, `getMonth()`, `getDay()`, `getDate()`, etc.
// -- https://stackoverflow.com/questions/33184096/date-new-date-date-valueof-vs-date-now: `new Date()` vs `Date.now()` as of 2019
// -- https://www.w3resource.com/javascript-exercises/javascript-date-exercise-3.php: How to get the number of days in a specific month in JavaScript
// -- https://www.mysqltutorial.org/mysql-datetime/: A Complete Guide To MySQL DATETIME Data Type
// -- https://medium.com/create-a-clocking-in-system-on-react/create-a-react-app-displaying-the-current-date-and-time-using-hooks-21d946971556:
//   Create a React App Displaying the Current Date and Time Using Hooks | by Yousef Ahmed | Create a Clocking in System in React | Medium (source:
//   google search "useEffect and date")

// References for styling:
// -- https://fontawesome.com/docs/web/use-with/react/add-icons#add-individual-icons-explicitly: Font Awesome with React – minimalist setup
// -- https://stackoverflow.com/questions/23116591/how-to-include-a-font-awesome-icon-in-reacts-render/48905370#48905370: Example of minimalist setup

// References for a11y:
// -- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/table_role#best_practices: "A relevant use case for the ARIA table role is
//  when CSS's display property overrides the native semantics of a table, such as by display: grid. In this case, you can use the ARIA table roles to
//  re-add the semantics." => In this case, native semantics of `<div>` is overridden
// -- https://www.tpgi.com/short-note-on-what-css-display-properties-do-to-table-semantics/
// -- https://stackoverflow.com/questions/21715162/when-should-i-use-a-button-button-or-a-link-a-in-html: <a> vs <button>
// -- https://old.reddit.com/r/reactjs/comments/wl5wao/what_is_better_for_whole_div_as_link_in_react/: <Link> (aka <a>) vs `useNavigate`,
//  accessibility-wise, detailed reasons of why <a> is preferred
// -- https://old.reddit.com/r/reactjs/comments/vq2hb6/which_is_better_to_use_link_or_usenavigate/: worst case of not using <a> is getting an ADA
//  lawsuit
// -- https://stackoverflow.com/questions/71781348/difference-between-link-and-usenavigate-from-react-router-dom: <Link> vs `useNavigate` concerning
//  Declarative vs Imperative Programming
