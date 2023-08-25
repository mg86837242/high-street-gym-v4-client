export function Btn5({ children, type = 'button', onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn glass bg-base-100 text-primary-content shadow shadow-black/50`}
    >
      {children}
    </button>
  );
}

export function Btn5Sm({ children, type = 'button', onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn glass btn-sm bg-base-100 text-primary-content shadow shadow-black/50`}
    >
      {children}
    </button>
  );
}
