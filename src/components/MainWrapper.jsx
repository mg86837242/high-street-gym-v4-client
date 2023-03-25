import Loading from './Loading';

export default function MainWrapper({ children, gap, mt, mb }) {
  return (
    <main
      id='main-element-wrapper'
      className='grid justify-items-center items-center w-full grid-cols-1 grid-rows-1 min-h-[80vh]'
    >
      <div
        id='main-content-wrapper'
        className={`flex flex-col justify-between items-center w-full ${gap} ${mt} ${mb} col-[1_/_2] row-[1_/_2]`}
      >
        {children}
      </div>
      <Loading display={'sticky flex justify-center items-start w-full h-full col-[1_/_2] row-[1_/_2]'} />
    </main>
  );
}
