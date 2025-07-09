import CreateNoteForm from '@/components/create-note-form';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black p-4 sm:p-8 text-white">
      <header className="w-full container mx-auto px-4 py-4">
        <Link href="/">
          <Logo />
        </Link>
      </header>
      <main className="w-full container mx-auto mt-8">
        <CreateNoteForm />
      </main>
    </div>
  );
}
