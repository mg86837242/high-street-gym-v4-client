import { Form, useOutletContext } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import Button2Sm from '../UI/Button2Sm';
import Button1Sm from '../UI/Button1Sm';

export default function DetailsIndex() {
  const [setEditable, editor] = useOutletContext();

  return (
    <>
      <EditorContent editor={editor} />
      <div className='flex justify-end gap-10 py-6 px-4'>
        <Form action='edit'>
          <Button2Sm onClick={() => setEditable(true)}>Edit</Button2Sm>
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
          <Button1Sm type='submit'>Delete</Button1Sm>
        </Form>
      </div>
    </>
  );
}
