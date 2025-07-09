import CreateNoteForm from '@/components/create-note-form';
import { Logo } from '@/components/logo';

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4 sm:p-8">
       <header className="w-full max-w-5xl mx-auto py-4">
        <Logo />
      </header>
      <main className="w-full max-w-2xl mt-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Crie sua Declaração
          </h1>
          <p className="text-muted-foreground text-lg">
            Preencha os campos abaixo para criar uma página única e especial para quem você ama.
          </p>
        </div>
        <CreateNoteForm />
      </main>
    </div>
  );
}
