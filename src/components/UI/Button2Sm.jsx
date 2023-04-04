export default function Button2Sm({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn btn-primary btn-sm text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
