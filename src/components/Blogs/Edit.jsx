import { useMemo, useEffect, useCallback } from 'react';
import { useOutletContext, useSubmit, useNavigate } from 'react-router-dom';
import { EditorContent } from '@tiptap/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import blogSchema from '../../schemas/blogs';
import { Btn2SmOutline } from '../UI/Btn2';
import { Btn1SmOutline } from '../UI/Btn1';
import FCRHFSm from '../FormControlRHF/FCRHFSm';

export default function Edit() {
  const { blog, limit, editable, setEditable, editor } = useOutletContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: useMemo(() => {
      return blog;
    }, [blog]),
    values: {
      body: editor.getHTML(),
    },
  });

  useEffect(() => {
    reset(blog);
  }, [reset, blog]);

  useEffect(() => {
    if (editable) {
      return;
    }
    setEditable(true);
  }, []);

  return (
    <>
      <div className='pt-6'>
        <div className='border border-base-content rounded-3xl'>
          <TitleForm
            register={register}
            issue={errors.title?.message}
            handleSubmit={handleSubmit}
            setEditable={setEditable}
          />
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          <WordCount editor={editor} issue={errors.body?.message} limit={limit} />
        </div>
      </div>
      <div className='flex justify-end gap-10 px-4 py-6'>
        <Btn2SmOutline type='submit' form='edit-blog'>
          Save
        </Btn2SmOutline>
        <Btn1SmOutline
          type='button'
          onClick={() => {
            setEditable(false);
            navigate(-1);
          }}
        >
          Cancel
        </Btn1SmOutline>
      </div>
    </>
  );
}

function TitleForm({ register, issue, handleSubmit, setEditable }) {
  const submit = useSubmit();

  return (
    <form
      id='edit-blog'
      onSubmit={handleSubmit((data) => {
        setEditable(false);
        submit({ body: JSON.stringify(data) }, { method: 'post' });
      })}
      noValidate
      className='flex flex-col px-4 py-2 border-b-[1px] border-base-content'
    >
      <FCRHFSm label='Title' issue={issue}>
        <input {...register('title')} className='input input-bordered input-sm' />
      </FCRHFSm>
      <input type='hidden' {...register('body')} className='input input-bordered input-sm' />
      <input
        type='hidden'
        {...register('loginId', { valueAsNumber: true })}
        className='input input-bordered input-sm'
      />
    </form>
  );
}

function MenuBar({ editor }) {
  const handleAddImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className='flex flex-col gap-2 px-4 py-4 border-b-[1px] border-base-content'>
      <div className='flex flex-wrap gap-2'>
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
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={
            editor.isActive('textStyle', { color: '#958DF1' })
              ? 'btn btn-outline btn-xs btn-active'
              : 'btn btn-outline btn-xs'
          }
        >
          purple
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#F98181').run()}
          className={
            editor.isActive('textStyle', { color: '#F98181' })
              ? 'btn btn-outline btn-xs btn-active'
              : 'btn btn-outline btn-xs'
          }
        >
          red
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
          className={
            editor.isActive('textStyle', { color: '#FBBC88' })
              ? 'btn btn-outline btn-xs btn-active'
              : 'btn btn-outline btn-xs'
          }
        >
          orange
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#FAF594').run()}
          className={
            editor.isActive('textStyle', { color: '#FAF594' })
              ? 'btn btn-outline btn-xs btn-active'
              : 'btn btn-outline btn-xs'
          }
        >
          yellow
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
          className={
            editor.isActive('textStyle', { color: '#70CFF8' })
              ? 'btn btn-outline btn-xs btn-active'
              : 'btn btn-outline btn-xs'
          }
        >
          blue
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#94FADB').run()}
          className={
            editor.isActive('textStyle', { color: '#94FADB' })
              ? 'btn btn-outline btn-xs btn-active'
              : 'btn btn-outline btn-xs'
          }
        >
          teal
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#B9F18D').run()}
          className={
            editor.isActive('textStyle', { color: '#B9F18D' })
              ? 'btn btn-outline btn-xs btn-active'
              : 'btn btn-outline btn-xs'
          }
        >
          green
        </button>
        <button onClick={() => editor.chain().focus().unsetColor().run()} className='btn btn-outline btn-xs'>
          unset color
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className='btn btn-outline btn-xs'>
          clear marks
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
          onClick={() => editor.chain().focus().splitListItem('listItem').run()}
          disabled={!editor.can().splitListItem('listItem')}
          className='btn btn-outline btn-xs'
        >
          split list item
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          disabled={!editor.can().sinkListItem('listItem')}
          className='btn btn-outline btn-xs'
        >
          sink list item
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          disabled={!editor.can().liftListItem('listItem')}
          className='btn btn-outline btn-xs'
        >
          lift list item
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
        <button onClick={() => editor.chain().focus().clearNodes().run()} className='btn btn-outline btn-xs'>
          clear nodes
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='btn btn-outline btn-xs'>
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()} className='btn btn-outline btn-xs'>
          hard break
        </button>
        <button onClick={handleAddImage} className='btn btn-outline btn-xs'>
          set image
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
      </div>
      {/* <p className='leading-5 text-[13px]'>
        <em>Note: to be implemented.</em>
      </p> */}
    </div>
  );
}

function WordCount({ editor, issue, limit }) {
  return (
    <div className='flex px-4 py-2 justify-between border-t-[1px] border-base-content'>
      {issue ? (
        <span className='text-rose-500 leading-5 text-[13px]'>{issue}</span>
      ) : (
        <span className='leading-5 text-[13px]'>Validation info will appear here</span>
      )}
      <span className='leading-5 text-[13px]'>
        {editor.storage.characterCount.characters()}/{limit} characters; {editor.storage.characterCount.words()} words
      </span>
    </div>
  );
}

// References:
// -- https://stackoverflow.com/questions/4692774: Recommend to use `TEXT` data type for storing blog post body
// -- https://stackoverflow.com/questions/39463134: How to store emoji in MySQL db
// -- https://react-hook-form.com/api/useform/#values: "The `values` props will react to changes and update the form
//  values, which is useful when your form needs to be updated by external state or server data."
