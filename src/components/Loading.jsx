import { useNavigation } from 'react-router-dom';

export default function Loading() {
  const navigation = useNavigation();

  return (
    <div className={navigation.state === 'idle' ? 'hidden' : 'fixed top-0 bottom-0 left-0 right-0'}>
      <div className='loading-spinner absolute top-1/2 left-1/2 mt-[-43px] ml-[-58px]'>
        <div id='square1'></div>
        <div id='square2'></div>
        <div id='square3'></div>
        <div id='square4'></div>
        <div id='square5'></div>
      </div>
    </div>
  );
}
