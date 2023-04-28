export default function SpinnerNoNav() {
  return (
    <div className={'fixed bottom-0 left-0 right-0 top-0'}>
      <div className='loading-spinner absolute left-1/2 top-1/2 ml-[-58px] mt-[-43px]'>
        <div id='square1'></div>
        <div id='square2'></div>
        <div id='square3'></div>
        <div id='square4'></div>
        <div id='square5'></div>
      </div>
    </div>
  );
}
