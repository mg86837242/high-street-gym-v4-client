import { useState, useEffect } from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();
  const [editable, setEditable] = useState(false);
  const editor = useEditor({
    editable,
    content: body,
    extensions: [StarterKit, Color, TextStyle],
    editorProps: {
      attributes: {
        class: 'min-w-full px-4 py-6 prose dark:prose-invert prose-sm sm:prose-base focus:outline-none',
      },
    },
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
        {editable ? (
          <div className='flex flex-col gap-4 py-6'>
            <div className='py-6 border border-base-content rounded-3xl'>
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
            </div>
          </div>
        ) : (
          <EditorContent editor={editor} />
        )}
      </article>
      <Outlet context={[setEditable]} />
    </div>
  );
}

function MenuBar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2 px-4'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className='btn btn-outline btn-xs'>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()} className='btn btn-outline btn-xs'>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 }) ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 }) ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 }) ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive('heading', { level: 4 }) ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive('heading', { level: 5 }) ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive('heading', { level: 6 }) ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'btn btn-outline btn-xs btn-active' : 'btn btn-outline btn-xs'}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='btn btn-outline btn-xs'>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()} className='btn btn-outline btn-xs'>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className='btn btn-outline btn-xs'
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className='btn btn-outline btn-xs'
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor('#f43f5e').run()}
        className={
          editor.isActive('textStyle', { color: '#f43f5e' })
            ? 'btn btn-outline btn-xs btn-active'
            : 'btn btn-outline btn-xs'
        }
      >
        red
      </button>
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
