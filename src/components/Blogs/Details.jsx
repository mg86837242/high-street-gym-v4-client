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
        class: 'min-w-full px-4 py-6 prose dark:prose-invert prose-sm md:prose-base lg:prose-lg focus:outline-none',
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

  return editor ? (
    <div className='flex flex-col'>
      <article className='min-w-full prose-sm md:prose-base lg:prose-lg'>
        <h1 className='px-4 font-bold text-accent'>{title}</h1>
        <div className='flex flex-col px-4'>
          <span>by {username}</span>
          <span className='leading-5 text-[13px] italic'>created at: {createdAt}</span>
          {updatedAt && <span className='leading-5 text-[13px] italic'>updated at: {updatedAt}</span>}
        </div>
      </article>
      <Outlet context={[setEditable, editor]} />
    </div>
  ) : null;
}

// References:
// -- https://tiptap.dev/guide/output: Tiptap output & necessary packages => Rendering Option 1 preferred
// ---- https://tiptap.dev/api/extensions/starter-kit: StarterKit already included several packages
// ---- https://www.npmjs.com/package/@tiptap/html: This one is not mentioned in the docs, but might be necessary
// ---- https://stackoverflow.com/questions/39758136: Rendering Option 2 => Google "how to render html string in react"
// ---- https://github.com/peternewnham/react-html-parser#readme: recommended by the above SO post, pay attention to
//  the security section, which indicates it's better than `html-react-parser`, however, still not perfect => Rendering
//  Option 1 is better
