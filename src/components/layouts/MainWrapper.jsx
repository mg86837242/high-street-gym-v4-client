import Spinner from '../ui/Spinner';

export default function MainWrapper({ children, gap, mt, mb }) {
  return (
    <main id='main-element-wrapper' className={`flex flex-col items-center w-full ${gap} ${mt} ${mb} min-h-[80vh]`}>
      {children}
      <Spinner />
    </main>
  );
}
