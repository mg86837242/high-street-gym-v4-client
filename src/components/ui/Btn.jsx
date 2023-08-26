export function Btn({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function BtnSm({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-sm text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function BtnXs({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-xs text-primary-content shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function BtnSmOutline({ children, type = 'submit', onClick, w }) {
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

export function BtnXsOutline({ children, type = 'submit', onClick, w }) {
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
