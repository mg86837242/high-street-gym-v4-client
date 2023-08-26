import { useOutletContext, useFetcher, Form } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import { Btn1Sm } from '../../components/ui/Btn1';
import { BtnSm } from '../../components/ui/Btn';

export default function DetailsIndex() {
  const { setEditable, editor, canEdit } = useOutletContext();
  const fetcher = useFetcher();

  return (
    <>
      <EditorContent editor={editor} />
      {canEdit && (
        <div className='flex justify-end gap-10 px-4 py-6'>
          <Form action='edit'>
            <Btn1Sm onClick={() => setEditable(true)}>Edit</Btn1Sm>
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
            <BtnSm>Delete</BtnSm>
          </fetcher.Form>
        </div>
      )}
    </>
  );
}
