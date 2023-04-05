import { Form, useOutletContext, useNavigate } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import Button2Sm from '../UI/Button2Sm';
import Button1Sm from '../UI/Button1Sm';

export default function Edit() {
  const [setEditable, editor] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      <div className='flex flex-col gap-4 pt-6'>
        <div className='py-6 border border-base-content rounded-3xl'>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className='flex justify-end gap-10 py-6 px-4'>
        <Form method='post'>
          <Button2Sm
            onClick={() => {
              // FIX useSubmit `FormData` obj
              setEditable(false);
            }}
          >
            Save
          </Button2Sm>
        </Form>
        <Button1Sm
          type='button'
          onClick={() => {
            setEditable(false);
            navigate(-1);
          }}
        >
          Cancel
        </Button1Sm>
      </div>
    </>
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
