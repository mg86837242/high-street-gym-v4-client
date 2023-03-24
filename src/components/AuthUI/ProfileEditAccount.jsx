import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, useActionData, Form } from 'react-router-dom';
import useDefaultValues from '../../hooks/useDefaultValues';
import InputSmallGroupEmail from '../UI/InputSmallGroupEmail';
import InputSmallGroupPass from '../UI/InputSmallGroupPass';
import InputSmallGroup from '../UI/InputSmallGroup';
import SelectSmallGroupGender from '../UI/SelectSmallGroupGender';
import SelectSmallGroupCountry from '../UI/SelectSmallGroupCountry';

export default function ProfileEditAccount() {
  const { authenticatedUser } = useContext(AuthContext);
  const [topStatusText, setTopStatusText] = useState('');
  const [botStatusText, setBotStatusText] = useState('');
  const [issues, setIssues] = useState({});
  const { emails } = useLoaderData();
  const defaultValues = useDefaultValues();
  const actionData = useActionData(null);

  useEffect(() => {
    if (!actionData) {
      return;
      // PS Logging `actionData` fires 4 times, (1 & 2) when `defaultValues` are not populated, rendering no elements,
      //  (3 & 4) when `defaultValues` are populated, rendering respective forms; however (5 & 6) if Effect doesn't
      //  have this short-circuit, Effect will goes into `setIssues(actionData)` block and causes `actionData` to
      //  fire twice again
    }
    let ignore = false;
    if (!ignore) {
      if (actionData?.status === 200) {
        if (actionData._action === 'updateAdminById') {
          (async () => {
            setIssues({});
            setTopStatusText(`✅ ${actionData.message}`);
            await new Promise((res) => setTimeout(res, 5_000));
            setTopStatusText('');
          })();
        }
        if (actionData._action === 'updateAddressByAdminId') {
          (async () => {
            setIssues({});
            setBotStatusText(`✅ ${actionData.message}`);
            await new Promise((res) => setTimeout(res, 5_000));
            setBotStatusText('');
          })();
        }
        if (actionData._action === 'updateTrainerById') {
          (async () => {
            setIssues({});
            setTopStatusText(`✅ ${actionData.message}`);
            await new Promise((res) => setTimeout(res, 5_000));
            setTopStatusText('');
          })();
        }
        if (actionData._action === 'updateAddressByTrainerId') {
          (async () => {
            setIssues({});
            setBotStatusText(`✅ ${actionData.message}`);
            await new Promise((res) => setTimeout(res, 5_000));
            setBotStatusText('');
          })();
        }
        if (actionData._action === 'updateMemberById') {
          (async () => {
            setIssues({});
            setTopStatusText(`✅ ${actionData.message}`);
            await new Promise((res) => setTimeout(res, 5_000));
            setTopStatusText('');
          })();
        }
        if (actionData._action === 'updateAddressByMemberId') {
          (async () => {
            setIssues({});
            setBotStatusText(`✅ ${actionData.message}`);
            await new Promise((res) => setTimeout(res, 5_000));
            setBotStatusText('');
          })();
        }
      } else {
        setIssues(actionData);
      }
    }
    return () => {
      ignore = true;
    };
  }, [actionData]);

  // FIX "Filter My Bookings" button for member and trainer && cond rendering edit button only for their own bookings
  // NB Need to check if `defaultValues` is truthy, o/w `undefined` will be passed as the `defaultValue` prop for
  //  following inputs before `defaultValues` is populated by the custom Hook, and `useEffect` will be needed to
  //  subscribe to the change of `defaultValues` from `undefined` to something
  return defaultValues ? (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Account</h1>
      <Form method='post' noValidate className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'>
        {/* (1) Shared input fields: */}
        <InputSmallGroupEmail issue={issues?.email} defaultValue={defaultValues?.email} emails={emails} />
        <InputSmallGroupPass issue={issues?.password} defaultValue={defaultValues?.password} />
        <InputSmallGroup name='username' type='text' issue={issues?.username} defaultValue={defaultValues?.username} />
        <InputSmallGroup
          name='firstName'
          type='text'
          issue={issues?.firstName}
          defaultValue={defaultValues?.firstName}
        />
        <InputSmallGroup name='lastName' type='text' issue={issues?.lastName} defaultValue={defaultValues?.lastName} />
        <InputSmallGroup name='phone' type='tel' issue={issues?.phone} defaultValue={defaultValues?.phone} />
        {/* (2) Conditional input fields and buttons: */}
        {authenticatedUser?.role === 'Admin' ? (
          <>
            <input type='hidden' name='id' value={authenticatedUser.adminId} />
            <button type='submit' name='_action' value='updateAdminById' className='btn btn-primary btn-sm mt-4'>
              Save
            </button>
            <p className='text-success self-center mt-4'>{topStatusText}</p>
          </>
        ) : authenticatedUser?.role === 'Trainer' ? (
          <>
            <InputSmallGroup
              name='description'
              type='text'
              issue={issues?.description}
              defaultValue={defaultValues?.description}
              isRequired={false}
            />{' '}
            <InputSmallGroup
              name='specialty'
              type='text'
              issue={issues?.specialty}
              defaultValue={defaultValues?.specialty}
              isRequired={false}
            />{' '}
            <InputSmallGroup
              name='certificate'
              type='text'
              issue={issues?.certificate}
              defaultValue={defaultValues?.certificate}
              isRequired={false}
            />{' '}
            <InputSmallGroup
              name='imageUrl'
              type='text'
              issue={issues?.imageUrl}
              defaultValue={defaultValues?.imageUrl}
              isRequired={false}
            />
            <input type='hidden' name='id' value={authenticatedUser.trainerId} />
            <button type='submit' name='_action' value='updateTrainerById' className='btn btn-primary btn-sm mt-4'>
              Save
            </button>
            <p className='text-success self-center mt-4'>{topStatusText}</p>
          </>
        ) : authenticatedUser?.role === 'Member' ? (
          <>
            <InputSmallGroup
              name='age'
              type='text'
              issue={issues?.age}
              defaultValue={defaultValues?.age}
              isRequired={false}
            />
            <SelectSmallGroupGender issue={issues?.gender} defaultValue={defaultValues?.gender} isRequired={false} />
            <input type='hidden' name='id' value={authenticatedUser.memberId} />
            <button type='submit' name='_action' value='updateMemberById' className='btn btn-primary btn-sm mt-4'>
              Save
            </button>
            <p className='text-success self-center mt-4'>{topStatusText}</p>
          </>
        ) : (
          <></>
        )}
      </Form>
      <div className='divider'></div>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Address</h1>
      <Form method='post' noValidate className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'>
        {/* (1) Shared input fields: */}
        <InputSmallGroup name='lineOne' type='text' issue={issues?.lineOne} defaultValue={defaultValues?.lineOne} />
        <InputSmallGroup
          name='lineTwo'
          type='text'
          issue={issues?.lineTwo}
          defaultValue={defaultValues?.lineTwo}
          isRequired={false}
        />
        <InputSmallGroup name='suburb' type='text' issue={issues?.suburb} defaultValue={defaultValues?.suburb} />
        <InputSmallGroup name='postcode' type='text' issue={issues?.postcode} defaultValue={defaultValues?.postcode} />
        <InputSmallGroup name='state' type='text' issue={issues?.state} defaultValue={defaultValues?.state} />
        <SelectSmallGroupCountry issue={issues?.country} defaultValue={defaultValues?.country} />
        {/* (2) Conditional buttons: */}
        {authenticatedUser?.role === 'Admin' ? (
          <>
            <input type='hidden' name='adminId' value={authenticatedUser.adminId} />
            <button type='submit' name='_action' value='updateAddressByAdminId' className='btn btn-primary btn-sm mt-5'>
              Save
            </button>
            <p className='text-success self-center mt-4'>{botStatusText}</p>
          </>
        ) : authenticatedUser?.role === 'Trainer' ? (
          <>
            <input type='hidden' name='trainerId' value={authenticatedUser.trainerId} />
            <button
              type='submit'
              name='_action'
              value='updateAddressByTrainerId'
              className='btn btn-primary btn-sm mt-5'
            >
              Save
            </button>
            <p className='text-success self-center mt-4'>{botStatusText}</p>
          </>
        ) : authenticatedUser?.role === 'Member' ? (
          <>
            <input type='hidden' name='memberId' value={authenticatedUser.memberId} />
            <button
              type='submit'
              name='_action'
              value='updateAddressByMemberId'
              className='btn btn-primary btn-sm mt-5'
            >
              Save
            </button>
            <p className='text-success self-center mt-4'>{botStatusText}</p>
          </>
        ) : (
          <></>
        )}
      </Form>
    </div>
  ) : (
    <></>
  );
}
