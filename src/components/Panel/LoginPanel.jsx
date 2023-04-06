import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { emailSchema, passwordSchema } from '../../schemas/logins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button2 from '../UI/Button2';
import Button5 from '../UI/Button5';
import { LinkBtn2 } from '../UI/LinkButton2';

export default function LoginPanel() {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div
      id='login-panel-wrapper'
      className='flex flex-col w-full max-w-lg gap-8 px-10 pt-12 pb-8 my-auto bg-neutral rounded-3xl shadow-[0_0_30px_15px_rgba(255,255,255,0.2)]'
    >
      {authenticatedUser ? (
        <Greetings />
      ) : (
        <>
          <Directions />
          <LoginForm />
          <DemoLogins />
        </>
      )}
    </div>
  );
}

function Directions() {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-3xl font-extrabold focus:outline-none text-primary-content'>Login to your account</p>
      <p className='text-sm font-medium leading-none focus:outline-none text-primary-content'>
        Don't have account?{' '}
        <Link
          to='/signup'
          className={`text-sm font-medium leading-none underline cursor-pointer link link-primary focus:outline-none`}
        >
          Sign up here
        </Link>
      </p>
    </div>
  );
}

// function FedAuth() {
//   return (
//     <div className='flex flex-col gap-6 py-6'>
//       <button
//         aria-label='Continue with google'
//         className={`flex items-center w-full px-4 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5`}
//       >
//         <svg width='20' height='20' viewBox='0 0 19 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
//           <path
//             d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
//             fill='#4285F4'
//           />
//           <path
//             d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
//             fill='#34A853'
//           />
//           <path
//             d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
//             fill='#FBBC05'
//           />
//           <path
//             d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
//             fill='#EB4335'
//           />
//         </svg>
//         <p className='ml-4 text-base font-medium text-primary-content'>Continue with Google</p>
//       </button>
//       <button
//         hidden={true}
//         aria-label='Continue with twitter'
//         className={`flex items-center w-full px-4 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5`}
//       >
//         <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
//           <path
//             d='M22.1623 5.656C21.3989 5.9937 20.5893 6.21548 19.7603 6.314C20.634 5.79144 21.288 4.96902 21.6003 4C20.7803 4.488 19.8813 4.83 18.9443 5.015C18.3149 4.34158 17.4807 3.89497 16.5713 3.74459C15.6618 3.59421 14.7282 3.74849 13.9156 4.18346C13.1029 4.61842 12.4567 5.30969 12.0774 6.1498C11.6981 6.9899 11.607 7.93178 11.8183 8.829C10.1554 8.74566 8.52863 8.31353 7.04358 7.56067C5.55854 6.80781 4.24842 5.75105 3.1983 4.459C2.82659 5.09745 2.63125 5.82323 2.6323 6.562C2.6323 8.012 3.3703 9.293 4.4923 10.043C3.82831 10.0221 3.17893 9.84278 2.5983 9.52V9.572C2.5985 10.5377 2.93267 11.4736 3.54414 12.2211C4.15562 12.9685 5.00678 13.4815 5.9533 13.673C5.33691 13.84 4.6906 13.8647 4.0633 13.745C4.33016 14.5762 4.8503 15.3032 5.55089 15.8241C6.25147 16.345 7.09742 16.6338 7.9703 16.65C7.10278 17.3313 6.10947 17.835 5.04718 18.1322C3.98488 18.4294 2.87442 18.5143 1.7793 18.382C3.69099 19.6114 5.91639 20.2641 8.1893 20.262C15.8823 20.262 20.0893 13.889 20.0893 8.362C20.0893 8.182 20.0843 8 20.0763 7.822C20.8952 7.23017 21.6019 6.49702 22.1633 5.657L22.1623 5.656Z'
//             fill='#1DA1F2'
//           />
//         </svg>
//         <p className='ml-4 text-base font-medium text-primary-content'>Continue with Twitter</p>
//       </button>
//     </div>
//   );
// }

// function Divider() {
//   return <div className={`m-0 text-white divider before:h-[1px] after:h-[1px] before:bg-white after:bg-white`}>OR</div>;
// }

function LoginForm() {
  // NB Can't use React Router's action for this component b/c event handlers provided by the `AuthContext` involve
  //  context/state change after successfully fetching login and users endpoints, the context/state change part can't
  //  be placed in the action function.
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [issues, setIssues] = useState({});
  const [statusText, setStatusText] = useState('Login');
  const [inputType, setInputType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setStatusText('Logging in...');

    const messages = {};
    if (!emailSchema.safeParse(email).success) {
      messages.email = emailSchema.safeParse(email).error.issues[0].message;
    }
    if (!passwordSchema.safeParse(password).success) {
      messages.password = passwordSchema.safeParse(password).error.issues[0].message;
    }
    if (Object.keys(messages).length) {
      setIssues(messages);
      setStatusText('Login');
      return;
    }

    handleLogin(email, password)
      .then(() => navigate('/'))
      .catch(() => navigate('/login'));
  }

  function handleToggle(e) {
    e.stopPropagation();
    setInputType(inputType === 'password' ? 'text' : 'password');
    setIcon(icon === faEyeSlash ? faEye : faEyeSlash);
  }

  return (
    // NB `noValidate` is used to disable default validation message(s)
    // NB These input groups won't be extracted to component since they have special event handlers and states (due to
    //  not using React Router's action)
    <form onSubmit={handleSubmit} noValidate>
      <div id='email-input-group' className='w-full form-control'>
        <label htmlFor='email' className='pt-0 label'>
          <span className='text-white label-text'>Email:</span>
          <span className='text-gray-500 label-text-alt'>Required</span>
        </label>
        <input
          id='email'
          type='email'
          placeholder='Enter your email here'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full text-white input input-bordered input-primary'
        />
        <label htmlFor='email' className='label'>
          {issues?.email ? (
            <span className='text-rose-500 label-text-alt'>{issues.email}</span>
          ) : (
            <span className='text-gray-500 label-text-alt'>Validation info will appear here</span>
          )}
        </label>
      </div>
      <div id='password-input-group' className='relative w-full form-control'>
        <label htmlFor='password' className='pt-0 label'>
          <span className='text-white label-text'>Password:</span>
          <span className='text-gray-500 label-text-alt'>Required</span>
        </label>
        <input
          id='password'
          type={inputType}
          placeholder='Enter your password here'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full text-white input input-bordered input-primary'
        />
        {/* NB `type=`button'`, which implies no default behavior, is a must have in order for this button to work */}
        <button type='button' onClick={handleToggle} className='absolute right-0 mt-10 mr-3 cursor-pointer'>
          <FontAwesomeIcon icon={icon} className='w-4 h-4' />
        </button>
        <label htmlFor='password' className='label'>
          {issues?.password ? (
            <span className='text-rose-500 label-text-alt'>{issues.password}</span>
          ) : (
            <span className='text-gray-500 label-text-alt'>Validation info will appear here</span>
          )}
        </label>
      </div>
      <div className='pt-4'>
        <Button2 w='w-full'>{statusText}</Button2>
      </div>
    </form>
  );
}

function DemoLogins() {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='flex justify-between gap-2'>
      <button
        onClick={() =>
          handleLogin('demomember@gmail.com', 'abcd1234')
            .then(() => navigate('/'))
            .catch(() => navigate('/login'))
        }
        className={`flex-shrink shadow btn btn-outline btn-success btn-sm text-primary-content shadow-black/50`}
      >
        Demo Member Login
      </button>
      <button
        onClick={() =>
          handleLogin('demotrainer@gmail.com', 'abcd1234')
            .then(() => navigate('/'))
            .catch(() => navigate('/login'))
        }
        className={`flex-shrink shadow btn btn-outline btn-warning btn-sm text-primary-content shadow-black/50`}
      >
        Demo Trainer Login
      </button>
      <button
        onClick={() =>
          handleLogin('demoadmin@gmail.com', 'abcd1234')
            .then(() => navigate('/'))
            .catch(() => navigate('/login'))
        }
        className={`flex-shrink shadow btn btn-outline btn-error btn-sm text-primary-content shadow-black/50`}
      >
        Demo Admin Login
      </button>
    </div>
  );
}

function Greetings() {
  const { authenticatedUser, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-10'>
      <p className='text-2xl font-extrabold leading-6 focus:outline-none text-primary-content'>
        Greetings, <span className='text-primary'>{authenticatedUser?.username}!</span>
      </p>
      <p className='text-2xl font-extrabold leading-6 focus:outline-none text-primary-content'>
        You have logged in as {authenticatedUser?.role === 'Admin' ? 'an' : 'a'}{' '}
        <span className='text-primary'>{authenticatedUser?.role && authenticatedUser.role}!</span>
      </p>
      <div className='flex flex-col gap-5'>
        <LinkBtn2 to={'/'} w='w-full'>
          Visit Home
        </LinkBtn2>
        <Button5
          onClick={() => {
            handleLogout();
            navigate('/');
          }}
          w='w-full'
        >
          Logout
        </Button5>
      </div>
    </div>
  );
}

// References:
// -- https://tailwindcomponents.com/component/free-tailwind-css-sign-in-component
// -- https://css-tricks.com/the-options-for-password-revealing-inputs/: The Options for Password Revealing Inputs |
//  CSS-Tricks - CSS-Tricks
// -- https://codesandbox.io/s/show-hide-password-forked-pg8fue?file=/src/App.js: Code snippet to "show/hide password"
