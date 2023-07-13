import { nanoid } from 'nanoid';

const defaultSignup = () => {
  const username = nanoid(10);
  return {
    email: `${username}@server.com`,
    password: '',
    username,
    firstName: 'New',
    lastName: 'Member',
    phone: '0123456789',
    age: null,
    gender: null,
  };
};

export default defaultSignup;
