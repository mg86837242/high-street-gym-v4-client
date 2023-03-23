import { Link, Form, useActionData, useNavigation } from 'react-router-dom';
import InputGroupEmail from '../UI/InputGroupEmail';
import InputGroupPass from '../UI/InputGroupPass';
import InputGroup from '../UI/InputGroup';
import SelectGroupGender from '../UI/SelectGroupGender';
import Button1Full from '../UI/Button1Full';

export default function SignupPanel({ emails }) {
  return (
    <div
      id='signup-panel-wrapper'
      className='flex flex-col w-full max-w-lg md:max-w-2xl gap-6 px-10 pt-12 pb-8 my-auto bg-neutral rounded-xl shadow-[0_0_30px_15px_rgba(255,255,255,0.2)]'
    >
      <Directions />
      <SignupForm emails={emails} />
    </div>
  );
}

function Directions() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-3xl font-extrabold focus:outline-none text-primary-content'>Sign up form</p>
      <p className='text-sm font-medium leading-none focus:outline-none text-primary-content'>
        Already have account?{' '}
        <Link to='/login' className={`text-sm font-medium leading-none underline cursor-pointer link link-primary focus:outline-none`}>
          Log in here
        </Link>
      </p>
    </div>
  );
}

function SignupForm({ emails }) {
  const issues = useActionData();
  const navigation = useNavigation();
  const statusText = navigation.state === 'submitting' ? 'Signing up...' : 'Signup';

  return (
    <Form method='post' noValidate className='grid w-full grid-cols-1 md:grid-cols-2 gap-x-5'>
      <InputGroupEmail issue={issues?.email} defaultValue='demomember@gmail.com' emails={emails} />
      <InputGroupPass issue={issues?.password} defaultValue='abcd1234' />
      <InputGroup name='username' type='text' issue={issues?.username} defaultValue='demomember' />
      <InputGroup name='firstName' type='text' issue={issues?.firstName} defaultValue='Demo' />
      <InputGroup name='lastName' type='text' issue={issues?.lastName} defaultValue='Member' />
      <InputGroup name='phone' type='tel' issue={issues?.phone} defaultValue='0123456789' />
      <InputGroup name='age' type='text' issue={issues?.age} isRequired={false} />
      <SelectGroupGender issue={issues?.gender} isRequired={false} />
      <div className='col-span-1 pt-4 md:col-span-2'>
        <Button1Full>{statusText}</Button1Full>
      </div>
    </Form>
  );
}
