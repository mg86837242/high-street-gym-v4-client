import { nanoid } from 'nanoid/async';

const defaultNewMember = async () => {
  const username = await nanoid(10);
  return {
    email: `${username}@server.com`,
    password: 'abcd1234',
    username,
    firstName: 'New',
    lastName: 'Member',
    phone: '0123456789',
    age: null,
    gender: null,
    lineOne: '1 Ashley St',
    lineTwo: '',
    suburb: 'Brisbane City',
    postcode: '4000',
    state: 'QLD',
    country: 'Australia',
  };
};

export default defaultNewMember;
