import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, useActionData, Form } from 'react-router-dom';
import { API_URL } from '../../data/constants';
import SpinnerNoNav from '../SpinnerNoNav';
import InputGroupSmallEmail from '../FormControl/InputGroupSmallEmail';
import InputGroupSmallPass from '../FormControl/InputGroupSmallPass';
import InputGroupSmall from '../FormControl/InputGroupSmall';
import SelectGroupSmallGender from '../FormControl/SelectGroupSmallGender';
import SelectGroupSmallCountry from '../FormControl/SelectGroupSmallCountry';

export default function ProfileEditAccount() {
  const { authenticatedUser } = useContext(AuthContext);
  const [initialValues, setInitialValues] = useState(null);
  const [topStatusText, setTopStatusText] = useState('');
  const [botStatusText, setBotStatusText] = useState('');
  const [issues, setIssues] = useState({});
  const { emails } = useLoaderData();
  const actionData = useActionData();

  // Why is this Effect fires 8 times after submitting form (for example to update admin by id) => Theory: (1) revalidation causes the user context (the dependency) and subsequently the default values to update, causing this Effect to run twice, (2) the Effect syncing with `actionData` for revalidation purposes causes this Effect to run twice, proved by disabling that Effect, (3) updating this source code or idling for some time before tab-switching to browser will cause Effect to run 4 times, (4) bear in mind that I'm using controlled input for managing the initial value for email, but uncontrolled for managing the input values other inputs/selects, elements are halted to render before `initialValues` loaded, o/w controlled inputs can't be updated due to the fact that they can only be updated thru setter, not subscribing to the change of `initialValues`
  useEffect(() => {
    if (!authenticatedUser) {
      return undefined;
    }
    let controller = new AbortController();
    const { role, adminId, trainerId, memberId } = authenticatedUser;
    switch (role) {
      case 'Admin':
        (async () => {
          const response = await fetch(`${API_URL}/admins/admin-with-all-details-by-id/${adminId}`, {
            credentials: 'include',
            signal: controller.signal,
          });
          const json = await response.json();
          setInitialValues(json.initialValues);
          controller = null;
        })();
        break;
      case 'Trainer':
        (async () => {
          const response = await fetch(`${API_URL}/trainers/trainer-with-all-details-by-id/${trainerId}`, {
            credentials: 'include',
            signal: controller.signal,
          });
          const json = await response.json();
          setInitialValues(json.initialValues);
          controller = null;
        })();
        break;
      case 'Member':
        (async () => {
          const response = await fetch(`${API_URL}/members/member-with-all-details-by-id/${memberId}`, {
            credentials: 'include',
            signal: controller.signal,
          });
          const json = await response.json();
          setInitialValues(json.initialValues);
          controller = null;
        })();
        break;
      default:
        break;
    }
    return () => controller?.abort();
  }, [authenticatedUser]);

  // useEffect(() => {
  //   if (!actionData) {
  //     return;
  //     // PS Logging `actionData` fires 4 times, (1 & 2) when `initialValues` are not populated, rendering no elements,
  //     //  (3 & 4) when `initialValues` are populated, rendering respective forms; (NB however, if this Effect doesn't
  //     //  have this short-circuit, Effect will goes into `else` block and causes `actionData` to fire twice again)
  //   }
  //   let ignore = false;
  //   if (actionData?.status === 200) {
  //     switch (actionData._action) {
  //       case 'updateAdminById':
  //         (async () => {
  //           if (!ignore) {
  //             setIssues({});
  //             setTopStatusText(`✅ ${actionData.message}`);
  //             // await new Promise((r) => setTimeout(r, 5_000));
  //             // setTopStatusText('');
  //           }
  //         })();
  //         break;
  //       case 'updateAddressByAdminId':
  //         (async () => {
  //           if (!ignore) {
  //             setIssues({});
  //             setBotStatusText(`✅ ${actionData.message}`);
  //             await new Promise((r) => setTimeout(r, 5_000));
  //             setBotStatusText('');
  //           }
  //         })();
  //         break;
  //       case 'updateTrainerById':
  //         (async () => {
  //           if (!ignore) {
  //             setIssues({});
  //             setTopStatusText(`✅ ${actionData.message}`);
  //             await new Promise((r) => setTimeout(r, 5_000));
  //             setTopStatusText('');
  //           }
  //         })();
  //         break;
  //       case 'updateAddressByTrainerId':
  //         (async () => {
  //           if (!ignore) {
  //             setIssues({});
  //             setBotStatusText(`✅ ${actionData.message}`);
  //             await new Promise((r) => setTimeout(r, 5_000));
  //             setBotStatusText('');
  //           }
  //         })();
  //         break;
  //       case 'updateMemberById':
  //         (async () => {
  //           if (!ignore) {
  //             setIssues({});
  //             setTopStatusText(`✅ ${actionData.message}`);
  //             await new Promise((r) => setTimeout(r, 5_000));
  //             setTopStatusText('');
  //           }
  //         })();
  //         break;
  //       case 'updateAddressByMemberId':
  //         (async () => {
  //           if (!ignore) {
  //             setIssues({});
  //             setBotStatusText(`✅ ${actionData.message}`);
  //             await new Promise((r) => setTimeout(r, 5_000));
  //             setBotStatusText('');
  //           }
  //         })();
  //         break;
  //       default:
  //         break;
  //     }
  //   } else {
  //     if (!ignore) {
  //       setIssues(actionData);
  //     }
  //   }
  //   return () => {
  //     setIssues({});
  //     setTopStatusText('');
  //     setBotStatusText('');
  //     ignore = true;
  //   };
  // }, [actionData]);

  // NB Need to check if `initialValues` is truthy, o/w `undefined` will be passed as the `initialValue` prop for
  //  following inputs before `initialValues` is populated, which requires controlled input/select
  return initialValues ? (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-primary-content'>Edit My Account</h1>
      <Form method='post' noValidate className='grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5'>
        {/* (1) Shared input fields: */}
        <InputGroupSmallEmail issue={issues?.email} initialValue={initialValues?.email} emails={emails} />
        <InputGroupSmallPass issue={issues?.password} initialValue={initialValues?.password} />
        <InputGroupSmall name='username' type='text' issue={issues?.username} initialValue={initialValues?.username} />
        <InputGroupSmall
          name='firstName'
          type='text'
          issue={issues?.firstName}
          initialValue={initialValues?.firstName}
        />
        <InputGroupSmall name='lastName' type='text' issue={issues?.lastName} initialValue={initialValues?.lastName} />
        <InputGroupSmall name='phone' type='tel' issue={issues?.phone} initialValue={initialValues?.phone} />
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
              initialValue={initialValues?.description}
              isRequired={false}
            />{' '}
            <InputGroupSmall
              name='specialty'
              type='text'
              issue={issues?.specialty}
              initialValue={initialValues?.specialty}
              isRequired={false}
            />{' '}
            <InputGroupSmall
              name='certificate'
              type='text'
              issue={issues?.certificate}
              initialValue={initialValues?.certificate}
              isRequired={false}
            />{' '}
            <InputGroupSmall
              name='imageUrl'
              type='text'
              issue={issues?.imageUrl}
              initialValue={initialValues?.imageUrl}
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
              initialValue={initialValues?.age}
              isRequired={false}
            />
            <SelectGroupSmallGender issue={issues?.gender} initialValue={initialValues?.gender} isRequired={false} />
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
        <InputGroupSmall name='lineOne' type='text' issue={issues?.lineOne} initialValue={initialValues?.lineOne} />
        <InputGroupSmall
          name='lineTwo'
          type='text'
          issue={issues?.lineTwo}
          initialValue={initialValues?.lineTwo}
          isRequired={false}
        />
        <InputGroupSmall name='suburb' type='text' issue={issues?.suburb} initialValue={initialValues?.suburb} />
        <InputGroupSmall name='postcode' type='text' issue={issues?.postcode} initialValue={initialValues?.postcode} />
        <InputGroupSmall name='state' type='text' issue={issues?.state} initialValue={initialValues?.state} />
        <SelectGroupSmallCountry issue={issues?.country} initialValue={initialValues?.country} />
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
    <SpinnerNoNav />
    // ??? [Not that important] Skeleton doesn't work here
  );
}
