import { useState, useMemo, useEffect } from 'react';
import { useLoaderData, Outlet, Form, useSubmit, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema } from '../../schemas';
import { convertEmptyStrToNull } from '../../helpers/sanitize';
import { Btn1XsOutline } from '../../components/ui/Btn1';
import { Btn2SmOutline, Btn2XsOutline } from '../../components/ui/Btn2';
import FCRHFSm from '../../components/formCtrlRHF/FCRHFSm';

export function MngActivities() {
  const { activities } = useLoaderData();

  return (
    <div className='flex flex-col w-full gap-0 overflow-x-auto'>
      <ListActivities activities={activities} />
      <Outlet />
    </div>
  );
}

function ListActivities({ activities }) {
  return (
    <div className='py-6 overflow-x-auto'>
      <table className='table w-full table-compact'>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>category</th>
            <th>description</th>
            <th>intensity level</th>
            <th>max people allowed</th>
            <th>requirement 1</th>
            <th>requirement 2</th>
            <th>duration (minutes)</th>
            <th>price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(
            ({
              id,
              name,
              category,
              description,
              intensityLevel,
              maxPeopleAllowed,
              requirementOne,
              requirementTwo,
              durationMinutes,
              price,
            }) => (
              <tr key={`r${id}`} className='hover'>
                <th>{id}</th>
                <td>{name}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{intensityLevel}</td>
                <td>{maxPeopleAllowed}</td>
                <td>{requirementOne}</td>
                <td>{requirementTwo}</td>
                <td>{durationMinutes}</td>
                <td>{price}</td>
                <td>
                  <Form action={`${id}/edit`}>
                    <Btn2XsOutline>Edit</Btn2XsOutline>
                  </Form>
                </td>
                <td>
                  <Form
                    method='post'
                    action={`${id}/destroy`}
                    onSubmit={e => {
                      if (!confirm('Please confirm you want to delete this activity.')) {
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

export function NewActivity() {
  const [file, setFile] = useState(undefined);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col-reverse items-end gap-5 py-6 lg:flex-row lg:justify-between lg:items-start'>
        <div className='flex flex-col gap-5'>
          <Form
            method='post'
            action='new-upload-xml'
            encType='multipart/form-data'
            className='flex flex-col items-end gap-5 lg:items-center lg:flex-row'
          >
            <label htmlFor='new-activity-xml' className='flex-shrink-0'>
              <span className='flex-shrink-0 label-text'>Import New Activity by XML: </span>
            </label>
            <input
              name='new-activity-xml'
              id='new-activity-xml'
              type='file'
              accept='.xml'
              // value={file}
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
          Note: For XML upload, (1) accepted text content for &lt;categories&gt;, if not left blank, include: Aerobic,
          Strength, Aerobic &amp; Strength, Flexibility; (2) accepted text content for &lt;intensityLevel&gt;, if not
          left blank, include: Low, Medium, High, Very High, Varies with Type; (3) element names need to be in camel
          case in order to comply with API and database design.
        </em>
      </p>
      <p className='text-right lg:text-left'>
        👉 You can try upload the{' '}
        <Link to='/exampleNewActivities.xml' target='_blank' download className='link link-primary'>
          sample XML
        </Link>{' '}
        to create new activities:
      </p>
    </div>
  );
}

export function EditActivity() {
  const { activity } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: useMemo(() => activity, [activity]),
  });
  // NB Subscribe to the change of `activity` returned by loader:
  //  -- https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
  //  -- API ref: https://react-hook-form.com/api/useform/reset/
  useEffect(() => reset(activity), [reset, activity]);

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
        <FCRHFSm label='Activity Name' register={register('name')} issue={errors.name?.message} />
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

// References:
// -- https://codesandbox.io/s/react-file-upload-lj1zn?from-embed: React file upload exemplar (source: "file upload
//  react codesandbox"), esp. for controlled <input type='file'>; alternatively, just use RRD <Form> (MUST have
//  `encType='multipart/form-data'` as <Form> prop) and action
// ---- https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post: Debug missing
//  boundary in fetch headers option (source: "content type multipart/form-data boundary missing")
// -- https://stackoverflow.com/questions/64803772: (source: "multer or express-fileupload" )
// ---- https://www.npmjs.com/package/express-fileupload
// ---- https://www.npmjs.com/package/multer
// -- https://www.sammeechward.com/uploading-images-express-and-react: (source: "multer with react")

// References for XML:
// -- https://www.convertcsv.com/csv-to-xml.htm: CSV to XML converter
// -- https://www.wikiwand.com/en/List_of_XML_and_HTML_character_entity_references

// References for download file in React (source: "react download static file site:stackoverflow.com"):
// -- https://stackoverflow.com/questions/50694881: (1) fetch backend method, (2) native HTML method, (3) React Router
//  method
// ---- https://www.geeksforgeeks.org/how-to-download-pdf-file-in-reactjs/: expand on the fetch backend method
// ---- https://stackoverflow.com/questions/57374561: this prompts me to check Vite's specs
// ---- https://vitejs.dev/guide/assets.html#the-public-directory: Vite's spec for the public dir
