import { useMemo } from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';
import { generateHTML } from '@tiptap/html';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';

const json = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Example ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'bold',
            },
          ],
          text: 'Text',
        },
      ],
    },
  ],
};

export default function Details() {
  const {
    blog: { id, title, body, createdAt, updatedAt, username },
  } = useLoaderData();
  const output = useMemo(
    () =>
      generateHTML(json, [
        Document,
        Paragraph,
        Text,
        Bold,
        // other extensions …
      ]),
    [json]
  );

  return (
    <div className='flex flex-col gap-4'>
      <article className='prose prose-zinc'>
        <h1>{title}</h1>
        <div className='flex flex-col'>
          <span>by {username}</span>
          <i className='text-[13px] leading-5'>created at: {createdAt}</i>
          {updatedAt && <i className='text-[13px] leading-5'>updated at: {updatedAt}</i>}
        </div>
        <pre>
          <code>{output}</code>
        </pre>
        <div>{output}</div>
      </article>
      <Outlet />
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
