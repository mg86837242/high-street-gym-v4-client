import Spinner from '../ui/Spinner';

export default function MainWrapper({ children, gap, mt, mb }) {
  return (
    <main id='main-element-wrapper' className={`flex w-full flex-col items-center ${gap} ${mt} ${mb} min-h-[80vh]`}>
      {children}
      <Spinner />
    </main>
  );
}
