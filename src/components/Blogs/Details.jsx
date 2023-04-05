import { useState, useEffect } from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();
  const [editable, setEditable] = useState(false);
  const editor = useEditor({
    editable,
    content: `
        <p>
          This text is <strong>read-only</strong>. No matter what you try, you are not able to edit something. Okay, if you click the edit button below you’ll be able to edit the text.
        </p>
        <p>
          If you want to check the state, you can call <code>editor.isEditable()</code>.
        </p>
      `,
    extensions: [StarterKit],
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-col gap-4'>
      <article className='min-w-full prose prose-zinc'>
        <h1>{title}</h1>
        <div className='flex flex-col'>
          <span>by {username}</span>
          <i className='text-[13px] leading-5'>created at: {createdAt}</i>
          {updatedAt && <i className='text-[13px] leading-5'>updated at: {updatedAt}</i>}
        </div>
        <EditorContent editor={editor} />
      </article>
      <Outlet context={[setEditable]} />
    </div>
  );
}

// References:
// -- https://tiptap.dev/guide/output: Tiptap output & necessary packages
// ---- https://tiptap.dev/api/extensions/starter-kit: StarterKit already included several packages
// ---- https://www.npmjs.com/package/@tiptap/html: This one is not mentioned in the docs, but is a must
// -- https://stackoverflow.com/questions/39758136: Rendering Option 2 => Google "how to render html string in react"
// ---- https://github.com/peternewnham/react-html-parser#readme: recommended by the above SO post, pay attention to
//  the security section, which indicates it's better than `html-react-parser`, however, still not perfect => Rendering
//  Option 1 might be better
