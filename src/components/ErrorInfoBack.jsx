import { useRouteError, useNavigation, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { ReactComponent as BoxIcon } from '../assets/error-box.svg';
import Button1 from './UI/Button1';

export default function ErrorInfo() {
  const error = useRouteError();
  const navigation = useNavigation();
  const navigate = useNavigate();
  // console.error(error); // only for debugging

  return navigation.state === 'loading' ? (
    <></>
  ) : isRouteErrorResponse(error) && error?.data ? (
    <div className='flex flex-col items-center justify-center w-full h-full gap-6'>
      <div className='flex flex-col items-center'>
        <h1>Oops!</h1>
        <BoxIcon className='w-32 h-32 lg:h-52 lg:w-52' />
        <h1 className='text-center text-rose-500'>{error.data.match(/\d+/)}</h1>
        <p className='text-center text-rose-500'>{error.data.match(/(?<=\d+\s).*/) || error.data}</p>
      </div>
      <Button1 onClick={() => navigate(-1)}>Go Back</Button1>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center w-full h-full gap-6'>
      <div className='flex flex-col items-center'>
        <h1>Oops!</h1>
        <BoxIcon className='w-32 h-32 lg:h-52 lg:w-52' />
        <p className='text-center text-rose-500'>Sorry, an unexpected error has occurred.</p>
        <p className='text-center text-rose-500'>{error.statusText || error.message}</p>
      </div>
      <Button1 onClick={() => navigate(-1)}>Go Back</Button1>
    </div>
  );
}
