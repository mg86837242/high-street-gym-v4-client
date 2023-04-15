export function Btn1({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn text-primary-content shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1Sm({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn btn-sm text-primary-content shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1Xs({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} shadow btn btn-xs text-primary-content shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1SmOutline({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn btn-sm btn-outline text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}

export function Btn1XsOutline({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} shadow btn btn-xs btn-outline text-primary-content shadow-black/50`}
    >
      {children}
    </button>
  );
}
