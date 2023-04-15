import { useState, useMemo, useEffect } from 'react';
import { useLoaderData, Outlet, Form, useSubmit, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from '../../schemas';
import { convertEmptyStrToNull } from '../../helpers/sanitize';
import { Btn1XsOutline } from '../../components/ui/Btn1';
import { Btn2SmOutline, Btn2XsOutline } from '../../components/ui/Btn2';
import FCRHFSm from '../../components/formCtrlRHF/FCRHFSm';

export function MngMembers() {
  const { members } = useLoaderData();

  return (
    <div className='flex flex-col w-full gap-0 overflow-x-auto'>
      <ListMembers members={members} />
      <Outlet />
    </div>
  );
}

function ListMembers({ members }) {
  return (
    <div className='py-6 overflow-x-auto'>
      <table className='table w-full table-compact'>
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
        <tbody>
          {members.map(
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
                  {/* TODO Admin u members UI */}
                  {/* <Form action={`${id}/edit`}> */}
                  <Btn2XsOutline type='button'>Edit</Btn2XsOutline>
                  {/* </Form> */}
                </td>
                <td>
                  <Form
                    method='post'
                    action={`${id}/destroy`}
                    onSubmit={e => {
                      if (!confirm('Please confirm you want to delete this member.')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Btn1XsOutline>Delete</Btn1XsOutline>
                  </Form>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export function NewMember() {
  const [file, setFile] = useState(null);

  return (
    <div className='flex flex-col gap-5 py-6'>
      <div className='flex flex-col-reverse items-end gap-5 lg:flex-row lg:justify-between lg:items-start lg:gap-0'>
        <div className='flex flex-col gap-5'>
          <Form
            method='post'
            action='new-upload-xml'
            encType='multipart/form-data'
            className='flex flex-col items-end gap-5 lg:items-center lg:flex-row'
          >
            <label htmlFor='new-member-xml' className='flex-shrink-0'>
              <span className='flex-shrink-0 label-text'>Import New Member by XML: </span>
            </label>
            <input
              name='new-member-xml'
              id='new-member-xml'
              type='file'
              accept='.xml'
              onChange={e => setFile(e.target.files[0])}
              className='w-full max-w-xs shadow file-input file-input-bordered file-input-sm shadow-black/50'
            />
            <Btn2SmOutline>Submit</Btn2SmOutline>
          </Form>
        </div>
        <div className='m-0 divider lg:hidden' />
        <Form method='post' action='new'>
          <Btn2SmOutline>Create New</Btn2SmOutline>
        </Form>
      </div>
      <p className='text-right lg:text-left'>
        <em>
          Note: For XML upload, (1) accepted text content for &lt;gender&gt;, if not left blank, includes: Female, Male,
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
  const { member } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: useMemo(() => member, [member]),
  });

  useEffect(() => reset(member), [reset, member]);

  return (
    <div className='grid py-6 place-items-center'>
      <form
        onSubmit={handleSubmit(data => {
          const sanitizedData = convertEmptyStrToNull(data);
          submit({ body: JSON.stringify(sanitizedData) }, { method: 'post' });
        })}
        noValidate
        className='grid w-full grid-cols-2 justify-items-center xl:grid-cols-3 gap-x-5'
      >
        <FCRHFSm label='Member Name' register={register('name')} issue={errors.name?.message} />
        <FCRHFSm label='Category' issue={errors.category?.message} isRequired={false}>
          <select {...register('category')} className='font-normal select select-bordered select-sm'>
            <option value=''>-- Choose Category --</option>
            <option value='Aerobic'>Aerobic</option>
            <option value='Strength'>Strength</option>
            <option value='Aerobic & Strength'>Aerobic & Strength</option>
            <option value='Flexibility'>Flexibility</option>
          </select>
        </FCRHFSm>
        <FCRHFSm
          label='Description'
          register={register('description')}
          issue={errors.description?.message}
          isRequired={false}
        />
        <FCRHFSm label='Intensity Level' issue={errors.intensityLevel?.message} isRequired={false}>
          <select {...register('intensityLevel')} className='font-normal select select-bordered select-sm'>
            <option value=''>-- Choose Intensity Level --</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
            <option value='Very High'>Very High</option>
            <option value='Varies with Type'>Varies with Type</option>
          </select>
        </FCRHFSm>
        <FCRHFSm
          label='Max People Allowed'
          type='number'
          register={register('maxPeopleAllowed', { valueAsNumber: true })}
          issue={errors.maxPeopleAllowed?.message}
          isRequired={false}
        />
        <FCRHFSm
          label='Requirement 1'
          register={register('requirementOne')}
          issue={errors.requirementOne?.message}
          isRequired={false}
        />
        <FCRHFSm
          label='Requirement 2'
          register={register('requirementTwo')}
          issue={errors.requirementTwo?.message}
          isRequired={false}
        />
        <FCRHFSm
          label='Duration (minutes)'
          type='number'
          register={register('durationMinutes', { valueAsNumber: true })}
          issue={errors.durationMinutes?.message}
        />
        <FCRHFSm
          label='Price'
          type='number'
          register={register('price', { valueAsNumber: true })}
          issue={errors.price?.message}
          isRequired={false}
        />
        <div className='flex justify-end w-full col-span-2 gap-10 py-6 xl:col-span-3'>
          <button type='submit' className='w-20 btn btn-outline btn-primary btn-sm'>
            Save
          </button>
          <button type='button' onClick={() => navigate(-1)} className='w-20 btn btn-outline btn-sm'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
