export default function MainWrapper({ children, gap, mt, mb }) {
  return (
    <main id="main-element-wrapper" className={`grid justify-items-center items-start ${gap} w-full min-h-[80vh] ${mt} ${mb}`}>
      {children}
    </main>
  );
}
