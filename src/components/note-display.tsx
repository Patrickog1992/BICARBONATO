'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function NoteDisplay() {
  const searchParams = useSearchParams();
  const noteContent = searchParams.get('content');
  const [decodedNote, setDecodedNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (noteContent) {
      try {
        setDecodedNote(decodeURIComponent(noteContent));
      } catch (e) {
        setError('This love note seems to be corrupted.');
      }
    } else {
      setError('No love note was found here.');
    }
  }, [noteContent]);

  const paragraphs = decodedNote.split('\n').filter(p => p.trim() !== '');

  return (
    <main 
      className="flex items-center justify-center min-h-screen p-8 animate-in fade-in duration-1000"
      style={{
        background: 'hsl(var(--background))'
      }}
    >
      <div className="relative max-w-3xl w-full text-center p-8 md:p-12 bg-card rounded-2xl shadow-2xl border-2 border-accent/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-3 rounded-full border-2 border-accent/20">
           <Heart className="w-8 h-8 text-accent" fill="hsl(var(--accent))" />
        </div>
        
        {error ? (
          <p className="font-headline text-3xl text-destructive">{error}</p>
        ) : (
          <div className="space-y-6">
            {paragraphs.map((p, index) => (
                <p key={index} className="font-body text-2xl md:text-3xl leading-relaxed text-foreground animate-in fade-in slide-in-from-bottom-5 duration-700" style={{animationDelay: `${100 * (index + 1)}ms`, animationFillMode: 'backwards'}}>
                    {p}
                </p>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
