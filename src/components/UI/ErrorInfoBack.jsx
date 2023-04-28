import { useRouteError, useNavigation, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { ReactComponent as BoxIcon } from '../../assets/error-box.svg';
import { Btn2 } from './Btn2';

export default function ErrorInfoBack() {
  const error = useRouteError();
  const navigation = useNavigation();
  const navigate = useNavigate();
  // console.error(error); // only for debugging

  return navigation.state === 'loading' ? (
    <></>
  ) : isRouteErrorResponse(error) && error?.data ? (
    <div className='flex h-full max-h-[calc(100vh-7.5rem)] w-full flex-col items-center justify-center gap-6'>
      <div className='flex flex-col items-center'>
        <h1>Oops!</h1>
        <BoxIcon className='h-32 w-32 lg:h-52 lg:w-52' />
        <h1 className='text-center text-rose-500'>{error.data.match(/^\d{3}/)}</h1>
        <p className='text-center text-rose-500'>{error.data.match(/(?<=^\d{3}\s).*/) || error.data}</p>
      </div>
      <Btn2 onClick={() => navigate(-1)}>Go Back</Btn2>
    </div>
  ) : (
    <div className='flex h-full max-h-[calc(100vh-7.5rem)] w-full flex-col items-center justify-center gap-6'>
      <div className='flex flex-col items-center'>
        <h1>Oops!</h1>
        <BoxIcon className='h-32 w-32 lg:h-52 lg:w-52' />
        <p className='text-center text-rose-500'>Sorry, an unexpected error has occurred.</p>
        <p className='text-center text-rose-500'>{error.statusText || error.message}</p>
      </div>
      <Btn2 onClick={() => navigate(-1)}>Go Back</Btn2>
    </div>
  );
}
