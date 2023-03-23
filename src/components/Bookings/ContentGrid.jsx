export default function ContentGrid({ children, id }) {
  return (
    <div id={id} className={`grid justify-center items-start grid-cols-1 grid-row-3 lg:grid-cols-3 lg:grid-row-1 gap-10 lg:gap-2 w-full px-5`}>
      {children}
    </div>
  );
}
