import { useState, useEffect } from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();
  const [editable, setEditable] = useState(false);
  const editor = useEditor({
    content: body,
    editable,
    editorProps: {
      attributes: {
        class: 'min-w-full px-4 py-6 prose dark:prose-invert prose-sm sm:prose-base focus:outline-none',
      },
    },
    extensions: [StarterKit, Color, TextStyle],
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
    <div className='flex flex-col'>
      <article className='min-w-full'>
        <h1 className='px-4 font-sans font-bold text-accent'>{title}</h1>
        <div className='flex flex-col px-4'>
          <span>by {username}</span>
          <i className='leading-5 text-[13px]'>created at: {createdAt}</i>
          {updatedAt && <i className='leading-5 text-[13px]'>updated at: {updatedAt}</i>}
        </div>
      </article>
      <Outlet context={[setEditable, editor]} />
    </div>
  );
}

// References:
// -- https://tiptap.dev/guide/output: Tiptap output & necessary packages
// ---- https://tiptap.dev/api/extensions/starter-kit: StarterKit already included several packages
// ---- https://www.npmjs.com/package/@tiptap/html: This one is not mentioned in the docs, but might be necessary
// ---- https://stackoverflow.com/questions/39758136: Rendering Option 2 => Google "how to render html string in react"
// ---- https://github.com/peternewnham/react-html-parser#readme: recommended by the above SO post, pay attention to
//  the security section, which indicates it's better than `html-react-parser`, however, still not perfect => Rendering
//  Option 1 is better
