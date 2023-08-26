export function Btn({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn shadow-black/50`}>
      {children}
    </button>
  );
}

export function BtnSm({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-sm shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function BtnXs({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-xs shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function BtnSmOutline({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-outline btn-sm shadow shadow-black/50`}>
      {children}
    </button>
  );
}

export function BtnXsOutline({ children, type = 'submit', onClick, w }) {
  return (
    <button type={type} onClick={onClick} className={`${w} btn btn-outline btn-xs shadow shadow-black/50`}>
      {children}
    </button>
  );
}
