import { useOutletContext, useFetcher, Form } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import { Btn2Sm } from '../../components/ui/Btn2';
import { Btn1Sm } from '../../components/ui/Btn1';

export default function DetailsIndex() {
  const { setEditable, editor, canEdit } = useOutletContext();
  const fetcher = useFetcher();

  return (
    <>
      <EditorContent editor={editor} />
      {canEdit && (
        <div className='flex justify-end gap-10 py-6 px-4'>
          <Form action='edit'>
            <Btn2Sm onClick={() => setEditable(true)}>Edit</Btn2Sm>
          </Form>
          <fetcher.Form
            method='post'
            action='destroy'
            onSubmit={e => {
              if (!confirm('Please confirm you want to delete this activity.')) {
                e.preventDefault();
              }
            }}
          >
            <Btn1Sm type='submit'>Delete</Btn1Sm>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
