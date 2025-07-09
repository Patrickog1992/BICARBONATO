import { Heart } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 text-center">
      <Heart className="h-8 w-8 text-accent" />
      <h1 className="text-4xl font-headline font-bold text-foreground">
        QR Love Notes
      </h1>
    </div>
  );
}
