import { Link, Form, useActionData, useNavigation } from 'react-router-dom';
import FCInput from '../../components/formCtrl/FCInput';
import FCInputPass from '../../components/formCtrl/FCInputPass';
import FCSelectGender from '../../components/formCtrl/FCSelectGender';
import { Btn2 } from '../../components/ui/Btn2';

export default function SignupPanel() {
  return (
    <div
      id='signup-panel-wrapper'
      className='my-auto flex w-full max-w-lg flex-col gap-6 rounded-3xl bg-neutral px-5 pb-5 pt-8 shadow-[0_0_30px_15px_rgba(255,255,255,0.2)] sm:px-10 sm:pb-8 sm:pt-12 md:max-w-2xl'
    >
      <Directions />
      <SignupForm />
    </div>
  );
}

function Directions() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-3xl font-extrabold text-primary-content focus:outline-none'>Sign up form</p>
      <p className='text-sm font-medium leading-none text-primary-content focus:outline-none'>
        Already have account?{' '}
        <Link
          to='/login'
          className={`link-primary link cursor-pointer text-sm font-medium leading-none underline focus:outline-none`}
        >
          Log in here
        </Link>
      </p>
    </div>
  );
}

// FIXME Rewrite <Signup> page by using RHF and use action data to check 409
function SignupForm() {
  const issues = useActionData();
  const navigation = useNavigation();
  const message = navigation.state === 'submitting' ? 'Signing up...' : 'Signup';

  return (
    <Form method='post' noValidate className='grid w-full grid-cols-1 gap-x-5 md:grid-cols-2'>
      <FCInput name='email' type='text' issue={issues?.email} initialValue='demomember@gmail.com' />
      <FCInputPass issue={issues?.password} initialValue='abcd1234' />
      <FCInput name='username' type='text' issue={issues?.username} initialValue='demomember' />
      <FCInput name='firstName' type='text' issue={issues?.firstName} initialValue='Demo' />
      <FCInput name='lastName' type='text' issue={issues?.lastName} initialValue='Member' />
      <FCInput name='phone' type='tel' issue={issues?.phone} initialValue='0123456789' />
      <FCInput name='age' type='number' issue={issues?.age} isRequired={false} />
      <FCSelectGender issue={issues?.gender} isRequired={false} />
      <div className='col-span-1 pt-4 md:col-span-2'>
        <Btn2 w='w-full'>{message}</Btn2>
      </div>
    </Form>
  );
}
