import { Form } from 'react-router-dom';
import Button2Sm from '../UI/Button2Sm';
import Button5Sm from '../UI/Button5Sm';

export default function DetailsIndex() {
  return (
    <div className='flex justify-end gap-10 py-6'>
      <Form action='edit'>
        <Button2Sm>Edit</Button2Sm>
      </Form>
      <Form
        method='post'
        action='destroy'
        onSubmit={(e) => {
          if (!confirm('Please confirm you want to delete this activity.')) {
            e.preventDefault();
          }
        }}
      >
        <Button5Sm type='submit'>Delete</Button5Sm>
      </Form>
    </div>
  );
}
