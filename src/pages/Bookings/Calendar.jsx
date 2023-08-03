import { useContext, useState, useMemo } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { today } from '../../data/keyDates';
import { monthNames, dayNames } from '../../helpers/mapDates';

export default function Calendar() {
  const auth = useContext(AuthContext);
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
            className='grid grid-cols-7 gap-2 rounded-t-lg bg-primary px-2 pt-2 text-primary-content 2xl:px-4 3xl:gap-4 3xl:px-6 3xl:pt-4'
          >
            {[...Array(7)].map((_, j) => (
              <div
                id={`calendar-header-cell-${j}`}
                key={j}
                className='grid h-11 min-h-0 w-11 place-items-center leading-none sm:text-base 3xl:h-12 3xl:w-12'
              >
                {dayNames[j]}
              </div>
            ))}
          </div>
        ) : (
          <div
            id={`calendar-row-${i}`}
            key={`r${i}`}
            className={`grid grid-cols-7 gap-2 px-2 2xl:px-4 3xl:gap-4 3xl:px-6 ${i > 5 && 'pb-2 3xl:pb-4'}`}
          >
            {[...Array(7)].map((_, j) => {
              const dayOnCal = 7 * i + j - 6 - monthStartDay;
              return dayOnCal > 0 && dayOnCal <= daysInMonth ? (
                <NavLink
                  to={`${year}-${month < 10 ? '0' + month : month}-${dayOnCal < 10 ? '0' + dayOnCal : dayOnCal}`}
                  id={`calendar-cell-${7 * i + j + 1}`}
                  tabIndex={0}
                  key={7 * i + j + 1}
                  className={({ isActive, isPending }) =>
                    `btn btn-circle grid h-11 min-h-0 w-11 place-items-center leading-none sm:text-base 3xl:h-12 3xl:w-12 ${
                      isActive ? 'btn-primary' : 'bg-base-100'
                      // NB 'loading` can still be a modifier class for 'btn' although it's deprecated in daisyUI 3.0+
                      //  @see: https://daisyui.com/docs/changelog/#breaking-changes:~:text=loading%20is%20no%20longer%20a%20modifier%20class%20for%20btn;
                      //  the old way (daisyUI 2.0) is better to work with RRD's <NavLink> to dynamic style loading
                      //  button style
                    } ${isPending && 'loading'}`
                  }
                >
                  {dayOnCal}
                </NavLink>
              ) : (
                <div
                  id={`calendar-cell-${7 * i + j + 1}`}
                  key={7 * i + j + 1}
                  className='grid h-11 min-h-0 w-11 place-items-center leading-none sm:text-base xl:h-12 xl:w-12'
                ></div>
              );
            })}
          </div>
        ),
      ),
    [year, month, monthStartDay, daysInMonth],
  );

  return (
    <CalendarWrapper>
      <div id='calendar-nav' className='flex items-center gap-10 rounded-lg bg-base-300 px-3 py-[.25rem] lg:gap-20'>
        <button
          // NB Bug: random texts get selected/highlighted => b/c the `<FontAwesomeIcon>` is a text element =>
          //  Solution: wrap up the `<FontAwesomeIcon>` within a button element
          tabIndex={0}
          onClick={() => {
            month === 1 ? (setYear(year => year - 1), setMonth(12)) : setMonth(month => month - 1);
          }}
        >
          <FontAwesomeIcon icon={faSquareCaretLeft} className='cursor-pointer text-2xl md:text-3xl' />
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
            month === 12 ? (setYear(year => year + 1), setMonth(1)) : setMonth(month => month + 1);
          }}
        >
          <FontAwesomeIcon icon={faSquareCaretRight} className='cursor-pointer text-2xl md:text-3xl' />
        </button>
      </div>
      <div
        id='calendar-content'
        role='table'
        aria-label='Dynamic calendar containing booking information'
        aria-colcount='7'
        className='flex flex-col gap-2 rounded-lg bg-base-300 3xl:gap-4'
      >
        {calendarCells}
      </div>
      {auth.user && <CreateNewBooking />}
    </CalendarWrapper>
  );
}

function CalendarWrapper({ children }) {
  const auth = useContext(AuthContext);

  return auth.user ? (
    <div
      id='calendar-wrapper'
      className='col-[1_/_2] row-[1_/_2] grid w-full content-start justify-items-center gap-3 lg:sticky lg:top-28 lg:min-h-[80vh] lg:w-fit lg:justify-self-end 3xl:gap-6'
    >
      {children}
    </div>
  ) : (
    <div
      id='calendar-wrapper'
      className='col-[1_/_2] row-[1_/_2] grid w-full content-start justify-items-center gap-3 lg:sticky lg:top-28 lg:min-h-[80vh] lg:w-fit lg:justify-self-center 3xl:gap-6'
    >
      {children}
    </div>
  );
}

function CreateNewBooking() {
  return (
    <section className='flex justify-center gap-5 text-center'>
      <Link to='new' className='btn btn-primary min-h-0 w-48 text-primary-content shadow shadow-black/50'>
        Create New Booking
      </Link>
    </section>
  );
}

// References for JS dates:
// -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#examples: (1) `Date()`
//  constructor, (2) instance methods for local time, namely 'getFullYear()`, `getMonth()`, `getDay()`, `getDate()`,
//  etc.
// -- https://stackoverflow.com/questions/33184096/date-new-date-date-valueof-vs-date-now: `new Date()` vs `Date.now()`
//  as of 2019
// -- https://www.w3resource.com/javascript-exercises/javascript-date-exercise-3.php: How to get the number of days in
//  a specific month in JavaScript
// -- https://www.mysqltutorial.org/mysql-datetime/: A Complete Guide To MySQL DATETIME Data Type
// -- https://medium.com/create-a-clocking-in-system-on-react/create-a-react-app-displaying-the-current-date-and-time-using-hooks-21d946971556:
//   Create a React App Displaying the Current Date and Time Using Hooks | by Yousef Ahmed | Create a Clocking in
//   System in React | Medium (source: google search "useEffect and date")

// References for styling:
// -- https://fontawesome.com/docs/web/use-with/react/add-icons#add-individual-icons-explicitly: Font Awesome with
//  React – minimalist setup
// -- https://stackoverflow.com/questions/23116591/how-to-include-a-font-awesome-icon-in-reacts-render/48905370#48905370:
//  Example of minimalist setup

// References for a11y:
// -- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/table_role#best_practices: "A relevant use
//  case for the ARIA table role is when CSS's display property overrides the native semantics of a table, such as by
//  display: grid. In this case, you can use the ARIA table roles to re-add the semantics." => In this case, native
//  semantics of `<div>` is overridden
// -- https://www.tpgi.com/short-note-on-what-css-display-properties-do-to-table-semantics/
// -- https://stackoverflow.com/questions/21715162/when-should-i-use-a-button-button-or-a-link-a-in-html: <a> vs
//  <button>
// -- https://old.reddit.com/r/reactjs/comments/wl5wao/what_is_better_for_whole_div_as_link_in_react/: <Link> (aka <a>)
//  vs `useNavigate`, accessibility-wise, detailed reasons of why <a> is preferred
// -- https://stackoverflow.com/questions/71781348/difference-between-link-and-usenavigate-from-react-router-dom:
//  <Link> vs `useNavigate` concerning Declarative vs Imperative Programming
