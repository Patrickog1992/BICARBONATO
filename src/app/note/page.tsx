import { Suspense } from 'react';
import NoteDisplay from '@/components/note-display';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotePage() {
  return (
    <Suspense fallback={<NoteLoadingSkeleton />}>
      <NoteDisplay />
    </Suspense>
  );
}

function NoteLoadingSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
            <div className="w-full max-w-3xl space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
            </div>
        </div>
    )
}