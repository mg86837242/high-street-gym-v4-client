export default function ContentGrid({ children, id, className }) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
