import { useNavigation } from 'react-router-dom';

export default function LoadingGlobal({ display }) {
  const navigation = useNavigation();

  return (
    <div className={navigation.state === 'loading' ? display : 'hidden'}>
      <div className='loading-spinner sticky top-[45vh]'>
        <div id='square1'></div>
        <div id='square2'></div>
        <div id='square3'></div>
        <div id='square4'></div>
        <div id='square5'></div>
      </div>
    </div>
  );
}
