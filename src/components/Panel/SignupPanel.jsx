import { Link, Form, useActionData, useNavigation } from 'react-router-dom';
import InputGrpEmail from '../FormControl/InputGrpEmail';
import InputGrpPass from '../FormControl/InputGrpPass';
import InputGrp from '../FormControl/InputGrp';
import SelectGrpGender from '../FormControl/SelectGrpGender';
import Button2 from '../UI/Button2';

export default function SignupPanel({ emails }) {
  return (
    <div
      id='signup-panel-wrapper'
      className='flex flex-col w-full max-w-lg md:max-w-2xl gap-6 px-10 pt-12 pb-8 my-auto bg-neutral rounded-3xl shadow-[0_0_30px_15px_rgba(255,255,255,0.2)]'
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
        <Link
          to='/login'
          className={`text-sm font-medium leading-none underline cursor-pointer link link-primary focus:outline-none`}
        >
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
      <InputGrpEmail issue={issues?.email} initialValue='demomember@gmail.com' emails={emails} />
      <InputGrpPass issue={issues?.password} initialValue='abcd1234' />
      <InputGrp name='username' type='text' issue={issues?.username} initialValue='demomember' />
      <InputGrp name='firstName' type='text' issue={issues?.firstName} initialValue='Demo' />
      <InputGrp name='lastName' type='text' issue={issues?.lastName} initialValue='Member' />
      <InputGrp name='phone' type='tel' issue={issues?.phone} initialValue='0123456789' />
      <InputGrp name='age' type='text' issue={issues?.age} isRequired={false} />
      <SelectGrpGender issue={issues?.gender} isRequired={false} />
      <div className='col-span-1 pt-4 md:col-span-2'>
        <Button2 w='w-full'>{statusText}</Button2>
      </div>
    </Form>
  );
}
