import { useNavigation } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';

const override = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-4rem',
  marginLeft: '-4rem',
};

export default function Spinner() {
  const navigation = useNavigation();

  return (
    <div className={navigation.state === 'idle' ? 'hidden' : 'fixed top-0 bottom-0 left-0 right-0'}>
      <MoonLoader
        color={'#FFFFFF'}
        loading={true}
        cssOverride={override}
        size={100}
        speedMultiplier={1}
        aria-label='Loading Spinner'
      />
    </div>
  );
}
