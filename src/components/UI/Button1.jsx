export default function Button1({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn btn-primary text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
