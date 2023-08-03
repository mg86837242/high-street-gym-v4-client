import { useState, useMemo, useEffect } from 'react';
import { useLoaderData, Outlet, Form, useFetcher, Link, useSubmit, useNavigate, useActionData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberDetailedSchema } from '../../schemas';
import { Btn1Xs, Btn1Sm } from '../../components/ui/Btn1';
import { Btn2Xs, Btn2Sm } from '../../components/ui/Btn2';
import FCRHF1Sm from '../../components/formCtrlRHF/FCRHF1';
import FCRHFPass1Sm from '../../components/formCtrlRHF/FCRHFPass1';
import countries from '../../data/countries.json'; // Vite's feature
import { convertEmptyStrToNull } from '../../helpers/sanitize';

// TODO Limit the ability to edit demo member's email and pass
export function MngMembers() {
  const { members } = useLoaderData();

  return (
    <div className='flex w-full flex-col gap-0 overflow-x-auto'>
      <ListMembers members={members} />
      <Outlet />
    </div>
  );
}

function ListMembers({ members }) {
  const fetcher = useFetcher();
  const memberTableBodyCells = useMemo(
    () =>
      members.map(
        ({
          id,
          email,
          username,
          firstName,
          lastName,
          phone,
          age,
          gender,
          lineOne,
          lineTwo,
          suburb,
          postcode,
          state,
          country,
        }) => (
          <tr key={`r${id}`} className='hover'>
            <th>{id}</th>
            <td>{email}</td>
            <td>●●●●●●●●●</td>
            <td>{username}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{phone}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{lineOne}</td>
            <td>{lineTwo}</td>
            <td>{suburb}</td>
            <td>{postcode}</td>
            <td>{state}</td>
            <td>{country}</td>
            <td>
              <Form action={`${id}/edit`}>
                <Btn2Xs>Edit</Btn2Xs>
              </Form>
            </td>
            <td>
              <fetcher.Form
                method='post'
                action={`${id}/destroy`}
                onSubmit={e => {
                  if (!confirm('Please confirm you want to delete this member.')) {
                    e.preventDefault();
                  }
                }}
              >
                <Btn1Xs>Delete</Btn1Xs>
              </fetcher.Form>
            </td>
          </tr>
        ),
      ),
    [members],
  );

  return (
    <div className='overflow-x-auto py-6'>
      <table className='table table-compact w-full'>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>password</th>
            <th>username</th>
            <th>first name</th>
            <th>last name</th>
            <th>phone</th>
            <th>age</th>
            <th>gender</th>
            <th>line 1</th>
            <th>line 2</th>
            <th>suburb</th>
            <th>postcode</th>
            <th>state</th>
            <th>country</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{memberTableBodyCells}</tbody>
      </table>
    </div>
  );
}

export function NewMember() {
  const [file, setFile] = useState(null);
  const fetcher = useFetcher();

  return (
    <div className='flex flex-col gap-5 py-6'>
      <div className='flex flex-col-reverse items-end gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-0'>
        <div className='flex flex-col gap-5'>
          <fetcher.Form
            method='post'
            action='new-upload-xml'
            encType='multipart/form-data'
            className='flex flex-col items-end gap-5 lg:flex-row lg:items-center'
          >
            <label htmlFor='new-member-xml' className='flex-shrink-0'>
              <span className='label-text flex-shrink-0'>Import New Member by XML: </span>
            </label>
            <input
              name='new-member-xml'
              id='new-member-xml'
              type='file'
              accept='.xml'
              onChange={e => setFile(e.target.files[0])}
              className='file-input file-input-bordered file-input-sm w-full max-w-xs shadow shadow-black/50'
            />
            <Btn2Sm>Submit</Btn2Sm>
          </fetcher.Form>
        </div>
        <div className='divider m-0 lg:hidden' />
        <fetcher.Form method='post' action='new'>
          <Btn2Sm>Create New</Btn2Sm>
        </fetcher.Form>
      </div>
      <p className='text-right lg:text-left'>
        <em>
          Note: For XML upload, (1) if not left blank, accepted text content for &lt;gender&gt; includes: Female, Male,
          Other; (2) element names need to be in camel case in order to comply with API and database design.
        </em>
      </p>
      <p className='text-right lg:text-left'>
        👉 You can try upload the{' '}
        <Link to='/sampleNewMembers.xml' target='_blank' download className='link link-primary'>
          sample XML
        </Link>{' '}
        to create new members:
      </p>
    </div>
  );
}

export function EditMember() {
  const [inputEmailMsg, setInputEmailMsg] = useState('');
  const { member } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const navigate = useNavigate();
  const memberDefaultValues = useMemo(() => {
    const { password, ...values } = member;
    return { ...values, password: '●●●●●●●●●●' };
  }, [member]);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(memberDetailedSchema),
    defaultValues: memberDefaultValues,
  });

  useEffect(() => reset(memberDefaultValues), [reset, member]);

  useEffect(() => {
    if (!actionData) {
      return;
    }
    if (actionData.status === 409) {
      setInputEmailMsg(actionData.message);
      return;
    }

    return () => setInputEmailMsg('');
  }, [actionData]);

  return (
    <div className='grid place-items-center py-6'>
      <form
        onSubmit={handleSubmit(data => {
          const sanitizedData = convertEmptyStrToNull(data);
          submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
        })}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center gap-x-5 xl:grid-cols-3'
      >
        <FCRHF1Sm label='Email' register={register('email')} issue={errors.email?.message || inputEmailMsg} />
        <FCRHFPass1Sm
          label='Password'
          register={register('password', { setValueAs: val => (isDirty ? val : member.password) })}
          issue={errors.password?.message}
        />
        <FCRHF1Sm label='Username' register={register('username')} issue={errors.username?.message} />
        <FCRHF1Sm label='First Name' register={register('firstName')} issue={errors.firstName?.message} />
        <FCRHF1Sm label='Last Name' register={register('lastName')} issue={errors.lastName?.message} />
        <FCRHF1Sm label='Phone' register={register('phone')} issue={errors.phone?.message} />
        <FCRHF1Sm
          label='Age'
          type='number'
          register={register('age', { valueAsNumber: true })}
          issue={errors.age?.message}
          isRequired={false}
        />
        <FCRHF1Sm label='Gender' issue={errors.gender?.message} isRequired={false}>
          <select {...register('gender')} className='select select-bordered select-sm font-normal'>
            <option value=''>-- Choose Gender --</option>
            <option value='Female'>Female</option>
            <option value='Male'>Male</option>
            <option value='Other'>Other</option>
          </select>
        </FCRHF1Sm>
        <FCRHF1Sm label='Line 1' register={register('lineOne')} issue={errors.lineOne?.message} />
        <FCRHF1Sm label='Line 2' register={register('lineTwo')} issue={errors.lineTwo?.message} isRequired={false} />
        <FCRHF1Sm label='Suburb' register={register('suburb')} issue={errors.suburb?.message} />
        <FCRHF1Sm label='Postcode' register={register('postcode')} issue={errors.postcode?.message} />
        <FCRHF1Sm label='State' register={register('state')} issue={errors.state?.message} />
        <FCRHF1Sm label='Country' issue={errors.country?.message}>
          <select {...register('country')} className='select select-bordered select-sm font-normal'>
            <option value='' disabled>
              -- Choose Country --
            </option>
            {countries.map(c => (
              <option value={c.name} key={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </FCRHF1Sm>
        <div className='col-span-2 flex w-full justify-end gap-10 py-6 xl:col-span-3'>
          <Btn2Sm onClick={() => setInputEmailMsg('')} w='w-20'>
            Save
          </Btn2Sm>
          <Btn1Sm type='button' onClick={() => navigate(-1)} w='w-20'>
            Cancel
          </Btn1Sm>
        </div>
      </form>
    </div>
  );
}
