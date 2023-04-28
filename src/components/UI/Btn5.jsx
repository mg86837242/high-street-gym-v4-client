export function Btn5({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} glass btn bg-base-100 text-primary-content shadow shadow-black/50`}
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
      className={`${w} glass btn-sm btn bg-base-100 text-primary-content shadow shadow-black/50`}
    >
      {children}
    </button>
  );
}
