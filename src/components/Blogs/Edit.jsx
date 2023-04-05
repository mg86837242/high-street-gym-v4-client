import { Form, useOutletContext, useNavigate } from 'react-router-dom';
import Button2Sm from '../UI/Button2Sm';
import Button1Sm from '../UI/Button1Sm';

export default function Edit() {
  const [setEditable] = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className='flex justify-end gap-10 py-6'>
      <Form method='post'>
        <Button2Sm
          onClick={() => {
            // FIX useSubmit `FormData` obj
            setEditable(false);
          }}
        >
          Save
        </Button2Sm>
      </Form>
      <Button1Sm
        type='button'
        onClick={() => {
          setEditable(false);
          navigate(-1);
        }}
      >
        Cancel
      </Button1Sm>
    </div>
  );
}
