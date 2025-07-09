import NoteDisplay from '@/components/note-display';
import { getNote, NoteData } from '@/services/note';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Make this page dynamic

interface NotePageProps {
  params: {
    id: string;
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const noteData = await getNote(params.id);

  if (!noteData) {
    notFound();
  }

  // Construct the full URL on the server side
  const host = process.env.HOST || 'http://localhost:3000';
  const currentUrl = `${host}/note/${params.id}`;

  return <NoteDisplay note={noteData} currentUrl={currentUrl} />;
}
