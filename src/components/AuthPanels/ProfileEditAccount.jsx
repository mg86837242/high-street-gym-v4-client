import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useLoaderData, useActionData, Form } from 'react-router-dom';
import SpinnerNoNav from '../SpinnerNoNav';
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
  const { emails, user: initialValues } = useLoaderData();
  const actionData = useActionData();

  // ??? In animal app, user edit page, `console.log(formData)` fires 4 times after initial mount & fires 6 times after POST req
  useEffect(() => {
    if (!actionData) {
      return;
      // PS If this Effect doesn't have this short-circuit, Effect will goes into `else` block and causes
      //  `actionData` to fire twice again)
    }
    if (actionData?.status === 200) {
      switch (actionData._action) {
        case 'updateAdminById':
          (async () => {
            setIssues({});
            setTopStatusText(`✅ ${actionData.message}`);
            await new Promise((r) => setTimeout(r, 5_000));
            setTopStatusText('');
          })();
          break;
        case 'updateAddressByAdminId':
          (async () => {
            setIssues({});
            setBotStatusText(`✅ ${actionData.message}`);
            await new Promise((r) => setTimeout(r, 5_000));
            setBotStatusText('');
          })();
          break;
        case 'updateTrainerById':
          (async () => {
            setIssues({});
            setTopStatusText(`✅ ${actionData.message}`);
            await new Promise((r) => setTimeout(r, 5_000));
            setTopStatusText('');
          })();
          break;
        case 'updateAddressByTrainerId':
          (async () => {
            setIssues({});
            setBotStatusText(`✅ ${actionData.message}`);
            await new Promise((r) => setTimeout(r, 5_000));
            setBotStatusText('');
          })();
          break;
        case 'updateMemberById':
          (async () => {
            setIssues({});
            setTopStatusText(`✅ ${actionData.message}`);
            await new Promise((r) => setTimeout(r, 5_000));
            setTopStatusText('');
          })();
          break;
        case 'updateAddressByMemberId':
          (async () => {
            setIssues({});
            setBotStatusText(`✅ ${actionData.message}`);
            await new Promise((r) => setTimeout(r, 5_000));
            setBotStatusText('');
          })();
          break;
        default:
          break;
      }
    } else {
      setIssues(actionData);
    }
    return () => {
      setIssues({});
      setTopStatusText('');
      setBotStatusText('');
    };
  }, [actionData]);

  // NB Need to halt the rendering by checking if `initialValues` is truthy before `initialValues` is populated, o/w
  //  `undefined` will be passed as the `initialValue` props, which would require to think about how to let controlled
  //  `<input>/<select>` keep in sync with the update of `initialValues`
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
