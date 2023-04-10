import { useOutletContext, Form } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import { Btn2SmOutline } from '../../components/ui/Btn2';
import { Btn1SmOutline } from '../../components/ui/Btn1';

export default function DetailsIndex() {
  const { setEditable, editor } = useOutletContext();

  return (
    <>
      <EditorContent editor={editor} />
      <div className='flex justify-end gap-10 py-6 px-4'>
        <Form action='edit'>
          <Btn2SmOutline onClick={() => setEditable(true)}>Edit</Btn2SmOutline>
        </Form>
        <Form
          method='post'
          action='destroy'
          onSubmit={e => {
            if (!confirm('Please confirm you want to delete this activity.')) {
              e.preventDefault();
            }
          }}
        >
          <Btn1SmOutline type='submit'>Delete</Btn1SmOutline>
        </Form>
      </div>
    </>
  );
}
