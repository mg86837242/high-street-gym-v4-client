export function Btn5({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn glass bg-base-100 text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}

export function Btn5Sm({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn glass bg-base-100 btn-sm text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
