export function Btn1({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1Sm({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn-sm btn text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1Xs({ children, type, onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn-xs btn text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1SmOutline({ children, type, onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn-outline btn-sm btn text-primary-content shadow shadow-black/50`}
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
      className={`${w} btn-outline btn-xs btn text-primary-content shadow shadow-black/50`}
    >
      {children}
    </button>
  );
}
