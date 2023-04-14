import { nanoid } from 'nanoid';

const defaultNewMember = {
  // FIX Bug creating 2 new consecutively would result in identical nanoid
  email: `${nanoid()}@server.com`,
  password: 'abcd1234',
  username: 'newmember',
  firstName: 'New',
  lastName: 'Member',
  phone: '0123456789',
  age: null,
  gender: null,
  lineOne: '1 Amber St',
  lineTwo: '',
  suburb: 'Brisbane City',
  postcode: '4000',
  state: 'QLD',
  country: 'Australia',
};

export default defaultNewMember;
