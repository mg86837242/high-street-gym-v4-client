import { useContext, useState } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Btn1 } from '../../components/ui/Btn1';
import { Btn5 } from '../../components/ui/Btn5';
import { LinkBtn1 } from '../../components/ui/LinkBtn1';
import { AuthContext } from '../../context/AuthContext';
import { emailSchema, passwordSchema } from '../../schemas';

export default function LoginPanel() {
  const auth = useContext(AuthContext);
  const [btnMsg, setBtnMsg] = useState('Login');
  const [issues, setIssues] = useState({ email: '', password: '' });
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <div
      id='login-panel-wrapper'
      className='my-auto flex w-full max-w-lg flex-col gap-8 rounded-3xl bg-base-300 px-5 pb-5 pt-8 shadow-[0_0_30px_15px_rgba(255,255,255,0.2)] sm:px-10 sm:pb-8 sm:pt-12'
    >
      {auth.user ? (
        <Greetings />
      ) : (
        <>
          <Directions />
          <LoginForm btnMsg={btnMsg} setBtnMsg={setBtnMsg} issues={issues} setIssues={setIssues} from={from} />
          <DemoLogins setBtnMsg={setBtnMsg} setIssues={setIssues} from={from} />
        </>
      )}
    </div>
  );
}

function Directions() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-3xl font-extrabold text-primary-content focus:outline-none'>Login to your account</p>
      <p className='text-sm font-medium leading-none text-primary-content focus:outline-none'>
        Don't have account?{' '}
        <Link
          to='/signup'
          className={`link-primary link cursor-pointer text-sm font-medium leading-none underline focus:outline-none`}
        >
          Sign up here
        </Link>
      </p>
    </div>
  );
}

function LoginForm({ btnMsg, setBtnMsg, issues, setIssues, from }) {
  // NB Fetch is done in the <AuthProvider> i/o in RRD's action, i.e., RRD's action is not used for login form
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);
  const navigate = useNavigate(); // NB Lifting the return of this Hook up to parent comp would cause bug, code after `setUser` would be unable to run

  async function handleSubmit(e) {
    e.preventDefault();
    setBtnMsg('Logging in...');
    setIssues({ email: '', password: '' });

    const collector = {};
    const emailResult = await emailSchema.spa(email);
    const passwordResult = await passwordSchema.spa(password);
    if (!emailResult.success) {
      collector.email = emailResult.error.issues[0].message;
    }
    if (!passwordResult.success) {
      collector.password = passwordResult.error.issues[0].message;
    }
    if (Object.keys(collector).length) {
      setIssues(collector);
      setBtnMsg('Login');
      return;
    }

    try {
      await auth.handleLogin(email, password, navigate(from, { replace: true }));
      setBtnMsg('Login');
    } catch (error) {
      setBtnMsg('Login');
      setIssues({
        email: `Login Failed: ${error?.message}`,
        password: `Login Failed: ${error?.message}`,
      });
    }
  }

  function handleToggle(e) {
    e.stopPropagation();
    setType(type === 'password' ? 'text' : 'password');
    setIcon(icon === faEyeSlash ? faEye : faEyeSlash);
  }

  return (
    // NB `noValidate` is used to disable default HTML validation message(s))
    <form onSubmit={handleSubmit} noValidate>
      <div id='email-input-group' className='form-control w-full'>
        <label htmlFor='email' className='label pt-0'>
          <span className='label-text text-white'>Email:</span>
          <span className='label-text-alt text-gray-500'>Required</span>
        </label>
        <input
          id='email'
          type='email'
          placeholder='Enter your email here'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='input input-bordered input-primary w-full text-white'
        />
        <label htmlFor='email' className='label'>
          {issues?.email ? (
            <span className='label-text-alt text-rose-500'>{issues.email}</span>
          ) : (
            <span className='label-text-alt text-gray-500'>Validation info will appear here</span>
          )}
        </label>
      </div>
      <div id='password-input-group' className='form-control relative w-full'>
        <label htmlFor='password' className='label pt-0'>
          <span className='label-text text-white'>Password:</span>
          <span className='label-text-alt text-gray-500'>Required</span>
        </label>
        <input
          id='password'
          type={type}
          placeholder='Enter your password here'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='input input-bordered input-primary w-full text-white'
        />
        {/* NB `type=`button'`, which implies no default behavior, is a must have in order for this button to work */}
        <button type='button' onClick={handleToggle} className='absolute right-0 mr-3 mt-10 cursor-pointer'>
          <FontAwesomeIcon icon={icon} className='h-4 w-4' />
        </button>
        <label htmlFor='password' className='label'>
          {issues?.password ? (
            <span className='label-text-alt text-rose-500'>{issues.password}</span>
          ) : (
            <span className='label-text-alt text-gray-500'>Validation info will appear here</span>
          )}
        </label>
      </div>
      <div className='pt-4'>
        <Btn1 w='w-full'>{btnMsg}</Btn1>
      </div>
    </form>
  );
}

function DemoLogins({ setBtnMsg, setIssues, from }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate(); // NB Lifting the return of this Hook up to parent comp would cause bug, code after `setUser` would be unable to run

  async function handleClickDemoLogin(email, password) {
    setBtnMsg('Logging in...');
    setIssues({ email: '', password: '' });

    try {
      await auth.handleLogin(email, password, navigate(from, { replace: true }));
      setBtnMsg('Login');
    } catch (error) {
      setBtnMsg('Login');
      setIssues({
        email: `Login Failed: ${error?.message}`,
        password: `Login Failed: ${error?.message}`,
      });
    }
  }

  return (
    <div className='flex justify-between gap-2'>
      <button
        onClick={() => handleClickDemoLogin('demomember@server.com', 'abcd1234')}
        className={`btn btn-success btn-outline btn-sm h-fit flex-shrink text-primary-content shadow shadow-black/50`}
      >
        Demo Member Login
      </button>
      <button
        onClick={() => handleClickDemoLogin('demotrainer@server.com', 'abcd1234')}
        className={`btn btn-warning btn-outline btn-sm h-fit flex-shrink text-primary-content shadow shadow-black/50`}
      >
        Demo Trainer Login
      </button>
      <button
        onClick={() => handleClickDemoLogin('demoadmin@server.com', 'abcd1234')}
        className={`btn btn-error btn-outline btn-sm h-fit flex-shrink text-primary-content shadow shadow-black/50`}
      >
        Demo Admin Login
      </button>
    </div>
  );
}

function Greetings() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate(); // NB Lifting the return of this Hook up to parent comp would cause bug, code after `setUser` would be unable to run

  return (
    <div className='flex flex-col gap-10'>
      <p className='text-2xl font-extrabold leading-6 text-primary-content focus:outline-none'>
        Greetings, <span className='text-primary'>{auth.user?.username}!</span>
      </p>
      <p className='text-2xl font-extrabold leading-6 text-primary-content focus:outline-none'>
        You have logged in as {auth.user?.role === 'Admin' ? 'an' : 'a'}{' '}
        <span className='text-primary'>{auth.user?.role && auth.user.role}!</span>
      </p>
      <div className='flex flex-col gap-5'>
        <LinkBtn1 to={'/'} w='w-full'>
          Visit Home
        </LinkBtn1>
        <Btn5
          type='button'
          onClick={() => {
            auth.handleLogout(() => navigate('/'));
          }}
          w='w-full'
        >
          Logout
        </Btn5>
      </div>
    </div>
  );
}

// References:
// -- https://tailwindcomponents.com/component/free-tailwind-css-sign-in-component
// -- https://css-tricks.com/the-options-for-password-revealing-inputs/: The Options for Password Revealing Inputs |
//  CSS-Tricks - CSS-Tricks
// -- https://codesandbox.io/s/show-hide-password-forked-pg8fue?file=/src/App.js: Code snippet to "show/hide password"
