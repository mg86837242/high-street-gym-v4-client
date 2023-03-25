import { useNavigation } from 'react-router-dom';

export default function LoadingGlobal({ display }) {
  const navigation = useNavigation();

  return (
    // <div
    //   className={navigation.state === 'idle' ? 'hidden' : display}
    // >
    <div className={`loading-spinner sticky ${navigation.state === 'idle' ? 'hidden' : display}`}>
      <div id='square1'></div>
      <div id='square2'></div>
      <div id='square3'></div>
      <div id='square4'></div>
      <div id='square5'></div>
    </div>
    // </div>
  );
}
