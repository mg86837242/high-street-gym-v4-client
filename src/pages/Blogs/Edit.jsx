import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext, useSubmit } from 'react-router-dom';
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditorContent } from '@tiptap/react';
import ArrowGoBackLineIcon from 'remixicon-react/ArrowGoBackLineIcon';
import ArrowGoForwardLineIcon from 'remixicon-react/ArrowGoForwardLineIcon';
import BoldIcon from 'remixicon-react/BoldIcon';
import CodeBoxLineIcon from 'remixicon-react/CodeBoxLineIcon';
import CodeViewIcon from 'remixicon-react/CodeViewIcon';
import DoubleQuotesLIcon from 'remixicon-react/DoubleQuotesLIcon';
import EraserLineIcon from 'remixicon-react/EraserLineIcon';
import FontColorIcon from 'remixicon-react/FontColorIcon';
import FormatClearIcon from 'remixicon-react/FormatClearIcon';
import H1Icon from 'remixicon-react/H1Icon';
import H2Icon from 'remixicon-react/H2Icon';
import H3Icon from 'remixicon-react/H3Icon';
import H4Icon from 'remixicon-react/H4Icon';
import H5Icon from 'remixicon-react/H5Icon';
import H6Icon from 'remixicon-react/H6Icon';
import ImageAddLineIcon from 'remixicon-react/ImageAddLineIcon';
import IndentDecreaseIcon from 'remixicon-react/IndentDecreaseIcon';
import IndentIncreaseIcon from 'remixicon-react/IndentIncreaseIcon';
import ItalicIcon from 'remixicon-react/ItalicIcon';
import ListOrderedIcon from 'remixicon-react/ListOrderedIcon';
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon';
import ParagraphIcon from 'remixicon-react/ParagraphIcon';
import SeparatorIcon from 'remixicon-react/SeparatorIcon';
import StrikethroughIcon from 'remixicon-react/StrikethroughIcon';
import TextWrapIcon from 'remixicon-react/TextWrapIcon';

import FCRHFSm from '../../components/formCtrlRHF/FCRHF1';
import { BtnSm } from '../../components/ui/Btn';
import { Btn1Sm } from '../../components/ui/Btn1';
import { blogSchema } from '../../schemas';

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
    defaultValues: useMemo(() => blog, [blog]),
    values: { body: editor.getHTML() },
  });

  useEffect(() => reset(blog), [reset, blog]);

  useEffect(() => {
    if (editable) {
      return;
    }
    setEditable(true);
  }, [editable, setEditable]);

  return (
    <>
      <div className='pt-6'>
        <div className='rounded-3xl border border-base-content'>
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
        <Btn1Sm form={'edit-blog'}>Save</Btn1Sm>
        <BtnSm
          type='button'
          onClick={() => {
            setEditable(false);
            navigate(-1);
          }}
        >
          Cancel
        </BtnSm>
      </div>
    </>
  );
}

function TitleForm({ register, issue, handleSubmit, setEditable }) {
  const submit = useSubmit();

  return (
    <form
      id='edit-blog'
      onSubmit={handleSubmit(data => {
        setEditable(false);
        submit({ body: JSON.stringify(data) }, { method: 'post' });
      })}
      noValidate
      className='flex flex-col border-b-[1px] border-base-content px-4 py-2'
    >
      <FCRHFSm label='Title' register={register('title')} issue={issue} />
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
    <div className='flex flex-col gap-2 border-b border-base-content px-4 py-4'>
      <div className='flex flex-wrap gap-2'>
        <button
          title='bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <BoldIcon size={16} />
        </button>
        <button
          title='italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <ItalicIcon size={16} />
        </button>
        <button
          title='strikethrough'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <StrikethroughIcon size={16} />
        </button>
        <button
          title='code'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <CodeViewIcon size={16} />
        </button>
        <button
          title='clear format'
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className='btn btn-outline btn-xs'
        >
          <FormatClearIcon size={16} />
        </button>
        <div className='mx-1 my-0.5 h-5 border-x border-base-content' />
        <button
          title='font color purple'
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={
            editor.isActive('textStyle', { color: '#958DF1' })
              ? 'btn btn-outline btn-active btn-xs'
              : 'btn btn-outline btn-xs'
          }
        >
          <FontColorIcon size={16} color='#958DF1' />
        </button>
        <button
          title='font color red'
          onClick={() => editor.chain().focus().setColor('#F98181').run()}
          className={
            editor.isActive('textStyle', { color: '#F98181' })
              ? 'btn btn-outline btn-active btn-xs'
              : 'btn btn-outline btn-xs'
          }
        >
          <FontColorIcon size={16} color='#F98181' />
        </button>
        <button
          title='font color orange'
          onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
          className={
            editor.isActive('textStyle', { color: '#FBBC88' })
              ? 'btn btn-outline btn-active btn-xs'
              : 'btn btn-outline btn-xs'
          }
        >
          <FontColorIcon size={16} color='#FBBC88' />
        </button>
        <button
          title='font color yellow'
          onClick={() => editor.chain().focus().setColor('#FAF594').run()}
          className={
            editor.isActive('textStyle', { color: '#FAF594' })
              ? 'btn btn-outline btn-active btn-xs'
              : 'btn btn-outline btn-xs'
          }
        >
          <FontColorIcon size={16} color='#FAF594' />
        </button>
        <button
          title='font color blue'
          onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
          className={
            editor.isActive('textStyle', { color: '#70CFF8' })
              ? 'btn btn-outline btn-active btn-xs'
              : 'btn btn-outline btn-xs'
          }
        >
          <FontColorIcon size={16} color='#70CFF8' />
        </button>
        <button
          title='font color teal'
          onClick={() => editor.chain().focus().setColor('#94FADB').run()}
          className={
            editor.isActive('textStyle', { color: '#94FADB' })
              ? 'btn btn-outline btn-active btn-xs'
              : 'btn btn-outline btn-xs'
          }
        >
          <FontColorIcon size={16} color='#94FADB' />
        </button>
        <button
          title='font color green'
          onClick={() => editor.chain().focus().setColor('#B9F18D').run()}
          className={
            editor.isActive('textStyle', { color: '#B9F18D' })
              ? 'btn btn-outline btn-active btn-xs'
              : 'btn btn-outline btn-xs'
          }
        >
          <FontColorIcon size={16} color='#B9F18D' />
        </button>
        <button
          title='clear font color'
          onClick={() => editor.chain().focus().unsetColor().run()}
          className='btn btn-outline btn-xs'
        >
          <FontColorIcon size={16} />
        </button>
        <div className='mx-1 my-0.5 h-5 border-x border-base-content' />
        <button
          title='paragraph'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <ParagraphIcon size={16} />
        </button>
        <button
          title='heading level 1'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={
            editor.isActive('heading', { level: 1 }) ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'
          }
        >
          <H1Icon size={16} />
        </button>
        <button
          title='heading level 2'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={
            editor.isActive('heading', { level: 2 }) ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'
          }
        >
          <H2Icon size={16} />
        </button>
        <button
          title='heading level 3'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={
            editor.isActive('heading', { level: 3 }) ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'
          }
        >
          <H3Icon size={16} />
        </button>
        <button
          title='heading level 4'
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={
            editor.isActive('heading', { level: 4 }) ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'
          }
        >
          <H4Icon size={16} />
        </button>
        <button
          title='heading level 5'
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={
            editor.isActive('heading', { level: 5 }) ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'
          }
        >
          <H5Icon size={16} />
        </button>
        <button
          title='heading level 6'
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={
            editor.isActive('heading', { level: 6 }) ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'
          }
        >
          <H6Icon size={16} />
        </button>
        <div className='mx-1 my-0.5 h-5 border-x border-base-content' />
        <button
          title='bullets'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <ListUnorderedIcon size={16} />
        </button>
        <button
          title='numbering'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <ListOrderedIcon size={16} />
        </button>
        <button
          title='split list'
          onClick={() => editor.chain().focus().splitListItem('listItem').run()}
          disabled={!editor.can().splitListItem('listItem')}
          className='btn btn-outline btn-xs'
        >
          <TextWrapIcon size={16} />
        </button>
        <button
          title='decrease indent'
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          disabled={!editor.can().liftListItem('listItem')}
          className='btn btn-outline btn-xs'
        >
          <IndentDecreaseIcon size={16} />
        </button>
        <button
          title='increase indent'
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          disabled={!editor.can().sinkListItem('listItem')}
          className='btn btn-outline btn-xs'
        >
          <IndentIncreaseIcon size={16} />
        </button>
        <div className='mx-1 my-0.5 h-5 border-x border-base-content' />
        <button
          title='code block'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <CodeBoxLineIcon size={16} />
        </button>
        <button
          title='block quote'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'btn btn-outline btn-active btn-xs' : 'btn btn-outline btn-xs'}
        >
          <DoubleQuotesLIcon size={16} />
        </button>
        <button
          title='clear markup'
          onClick={() => editor.chain().focus().clearNodes().run()}
          className='btn btn-outline btn-xs'
        >
          <EraserLineIcon size={16} />
        </button>
        <div className='mx-1 my-0.5 h-5 border-x border-base-content' />
        <button
          title='separator line'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className='btn btn-outline btn-xs'
        >
          <SeparatorIcon size={16} />
        </button>
        <button
          title='line break'
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className='btn btn-outline btn-xs'
        >
          <FontAwesomeIcon icon={faArrowTurnDown} className='w-4' rotation={90} />
        </button>
        <div className='mx-1 my-0.5 h-5 border-x border-base-content' />
        <button title='add image' onClick={handleAddImage} className='btn btn-outline btn-xs'>
          <ImageAddLineIcon size={16} />
        </button>
        <div className='mx-1 my-0.5 h-5 border-x border-base-content' />
        <button
          title='undo'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className='btn btn-outline btn-xs'
        >
          <ArrowGoBackLineIcon size={16} />
        </button>
        <button
          title='redo'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className='btn btn-outline btn-xs'
        >
          <ArrowGoForwardLineIcon size={16} />
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
    <div className='flex justify-between border-t-[1px] border-base-content px-4 py-2'>
      {issue ? (
        <span className='text-[13px] leading-5 text-rose-500'>{issue}</span>
      ) : (
        <span className='text-[13px] leading-5'>Validation info will appear here</span>
      )}
      <span className='text-[13px] leading-5'>
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
// -- https://codesandbox.io/s/tiptap-0sqm3i: Tiptap toolbar/menubar exemplar
