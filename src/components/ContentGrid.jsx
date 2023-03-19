export default function ContentGrid({ children, id, grid }) {
  return (
    <div id={id} className={`grid justify-center items-start ${grid}`}>
      {children}
    </div>
  );
}
