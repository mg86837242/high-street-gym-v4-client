import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, useActionData, Form } from 'react-router-dom';
import useDefaultValues from '../../hooks/useDefaultValues';
import LoadingNoNav from '../LoadingNoNav';
import InputGroupSmallEmail from '../FormControl/InputGroupSmallEmail';
import InputGroupSmallPass from '../FormControl/InputGroupSmallPass';
import InputGroupSmall from '../FormControl/InputGroupSmall';
import SelectGroupSmallGender from '../FormControl/SelectGroupSmallGender';
import SelectGroupSmallCountry from '../FormControl/SelectGroupSmallCountry';

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
      //  have this short-circuit, Effect will goes into `else` block and causes `actionData` to fire twice again
    }
    let ignore = false;
    if (actionData?.status === 200) {
      switch (actionData._action) {
        case 'updateAdminById':
          (async () => {
            if (!ignore) {
              setIssues({});
              setTopStatusText(`✅ ${actionData.message}`);
              await new Promise((r) => setTimeout(r, 5_000));
              setTopStatusText('');
            }
          })();
          break;
        case 'updateAddressByAdminId':
          (async () => {
            if (!ignore) {
              setIssues({});
              setBotStatusText(`✅ ${actionData.message}`);
              await new Promise((r) => setTimeout(r, 5_000));
              setBotStatusText('');
            }
          })();
          break;
        case 'updateTrainerById':
          (async () => {
            if (!ignore) {
              setIssues({});
              setTopStatusText(`✅ ${actionData.message}`);
              await new Promise((r) => setTimeout(r, 5_000));
              setTopStatusText('');
            }
          })();
          break;
        case 'updateAddressByTrainerId':
          (async () => {
            if (!ignore) {
              setIssues({});
              setBotStatusText(`✅ ${actionData.message}`);
              await new Promise((r) => setTimeout(r, 5_000));
              setBotStatusText('');
            }
          })();
          break;
        case 'updateMemberById':
          (async () => {
            if (!ignore) {
              setIssues({});
              setTopStatusText(`✅ ${actionData.message}`);
              await new Promise((r) => setTimeout(r, 5_000));
              setTopStatusText('');
            }
          })();
          break;
        case 'updateAddressByMemberId':
          (async () => {
            if (!ignore) {
              setIssues({});
              setBotStatusText(`✅ ${actionData.message}`);
              await new Promise((r) => setTimeout(r, 5_000));
              setBotStatusText('');
            }
          })();
          break;
        default:
          break;
      }
    } else {
      if (!ignore) {
        setIssues(actionData);
      }
    }
    return () => {
      ignore = true;
    };
  }, [actionData]);

  // NB Need to check if `defaultValues` is truthy, o/w `undefined` will be passed as the `defaultValue` prop for
  //  following inputs before `defaultValues` is populated by the custom Hook, and `useEffect` will be needed to
  //  subscribe to the change of `defaultValues` from `undefined` to something
  return defaultValues ? (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Account</h1>
      <Form method='post' noValidate className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'>
        {/* (1) Shared input fields: */}
        <InputGroupSmallEmail issue={issues?.email} defaultValue={defaultValues?.email} emails={emails} />
        <InputGroupSmallPass issue={issues?.password} defaultValue={defaultValues?.password} />
        <InputGroupSmall name='username' type='text' issue={issues?.username} defaultValue={defaultValues?.username} />
        <InputGroupSmall
          name='firstName'
          type='text'
          issue={issues?.firstName}
          defaultValue={defaultValues?.firstName}
        />
        <InputGroupSmall name='lastName' type='text' issue={issues?.lastName} defaultValue={defaultValues?.lastName} />
        <InputGroupSmall name='phone' type='tel' issue={issues?.phone} defaultValue={defaultValues?.phone} />
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
            <InputGroupSmall
              name='description'
              type='text'
              issue={issues?.description}
              defaultValue={defaultValues?.description}
              isRequired={false}
            />{' '}
            <InputGroupSmall
              name='specialty'
              type='text'
              issue={issues?.specialty}
              defaultValue={defaultValues?.specialty}
              isRequired={false}
            />{' '}
            <InputGroupSmall
              name='certificate'
              type='text'
              issue={issues?.certificate}
              defaultValue={defaultValues?.certificate}
              isRequired={false}
            />{' '}
            <InputGroupSmall
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
            <InputGroupSmall
              name='age'
              type='text'
              issue={issues?.age}
              defaultValue={defaultValues?.age}
              isRequired={false}
            />
            <SelectGroupSmallGender issue={issues?.gender} defaultValue={defaultValues?.gender} isRequired={false} />
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
        <InputGroupSmall name='lineOne' type='text' issue={issues?.lineOne} defaultValue={defaultValues?.lineOne} />
        <InputGroupSmall
          name='lineTwo'
          type='text'
          issue={issues?.lineTwo}
          defaultValue={defaultValues?.lineTwo}
          isRequired={false}
        />
        <InputGroupSmall name='suburb' type='text' issue={issues?.suburb} defaultValue={defaultValues?.suburb} />
        <InputGroupSmall name='postcode' type='text' issue={issues?.postcode} defaultValue={defaultValues?.postcode} />
        <InputGroupSmall name='state' type='text' issue={issues?.state} defaultValue={defaultValues?.state} />
        <SelectGroupSmallCountry issue={issues?.country} defaultValue={defaultValues?.country} />
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
    <LoadingNoNav />
    // ??? Skeleton doesn't work here
  );
}
