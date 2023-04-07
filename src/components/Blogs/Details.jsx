import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext.jsx';
import { useLoaderData, Outlet } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';

export default function Details() {
  const { authenticatedUser } = useContext(AuthContext);
  const { blog } = useLoaderData();
  const { title, body, loginId, createdAt, updatedAt, username } = blog;
  const canEdit = authenticatedUser?.id === loginId || authenticatedUser?.role === 'Admin';
  const [editable, setEditable] = useState(false);
  const limit = 6_000;
  const editor = useEditor({
    content: body,
    editable,
    editorProps: {
      attributes: {
        class: 'min-w-full px-4 py-6 prose dark:prose-invert prose-sm md:prose-base lg:prose-lg focus:outline-none',
      },
    },
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Image.configure({ HTMLAttributes: { class: 'rounded-3xl mx-auto' } }),
      CharacterCount.configure({ limit }),
    ],
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
          <span className='leading-5 text-[13px] italic'>Created at: {createdAt}</span>
          {updatedAt && <span className='leading-5 text-[13px] italic'>Updated at: {updatedAt}</span>}
          {canEdit && (
            <span className='leading-5 text-[13px]'>{editable ? '📝 Edit mode on' : '📖 Edit mode off'}</span>
          )}
        </div>
      </article>
      {canEdit ? (
        <Outlet context={{ blog, limit, editable, setEditable, editor }} />
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}

// References:
// -- https://tiptap.dev/guide/output: Tiptap output & necessary packages => Rendering Option 1 preferred
// ---- https://tiptap.dev/api/extensions/starter-kit: StarterKit already included several packages
// ---- https://www.npmjs.com/package/@tiptap/html: This one is not mentioned in the docs, but might be necessary
// ---- https://stackoverflow.com/questions/39758136: Rendering Option 2 => Google "how to render html string in react"
// ---- https://github.com/peternewnham/react-html-parser#readme: recommended by the above SO post, pay attention to
//  the security section, which indicates it's better than `html-react-parser`, however, still not perfect => Rendering
//  Option 1 is better
// -- https://stackoverflow.com/questions/72047804/passing-multiple-state-variables-through-outlet-context
