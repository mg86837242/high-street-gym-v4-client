export function Btn1({ children, type = 'button', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1Sm({ children, type = 'button', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-sm text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1Xs({ children, type = 'button', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-xs text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function Btn1SmOutline({ children, type = 'button', onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn btn-outline btn-sm text-primary-content shadow shadow-black/50`}
    >
      {children}
    </button>
  );
}

export function Btn1XsOutline({ children, type = 'button', onClick, w }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${w} btn btn-outline btn-xs text-primary-content shadow shadow-black/50`}
    >
      {children}
    </button>
  );
}
