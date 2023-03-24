import Loading from './Loading';

export default function MainWrapper({ children, gap, mt, mb }) {
  return (
    <main
      id='main-element-wrapper'
      className='grid items-center w-full min-h-[80vh] grid-cols-1 grid-rows-1 justify-items-center'
    >
      <div className={`grid items-start w-full h-full justify-items-center ${gap} ${mt} ${mb} col-[1_/_2] row-[1_/_2]`}>
        {children}
      </div>
      <Loading className={'sticky flex items-start justify-center w-full h-full col-[1_/_2] row-[1_/_2]'} />
    </main>
  );
}
