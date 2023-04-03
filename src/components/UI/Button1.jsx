export default function Button({ children, type, onClick, w }) {
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
