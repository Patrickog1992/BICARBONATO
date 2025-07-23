
'use client';

import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NoteData } from '@/services/note';
import { Timestamp } from 'firebase/firestore';
import RelationshipCounter from './relationship-counter';
import Image from "next/image";
import AnimationBackground from './animation-background';

function getYouTubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  let videoId: string | null = null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      videoId = urlObj.searchParams.get('v');
    }
  } catch (e) {
    console.error('Invalid URL for YouTube parsing', e);
    return null;
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
}

interface MorangoNoteDisplayProps {
  note: NoteData;
  currentUrl: string;
}

export default function MorangoNoteDisplay({ note, currentUrl }: MorangoNoteDisplayProps) {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    if (note.musicUrl) {
      setEmbedUrl(getYouTubeEmbedUrl(note.musicUrl));
    }
    if (note.startDate && note.startDate instanceof Timestamp) {
        setStartDate(note.startDate.toDate());
    }
  }, [note.musicUrl, note.startDate]);

  const handleDownload = async () => {
    if (qrCodeRef.current === null) {
      return;
    }
    try {
      const dataUrl = await toPng(qrCodeRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = 'codelove-qrcode.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Oops, something went wrong!', err);
    }
  };

  const paragraphs = note.loveNote.split('\n').filter(p => p.trim() !== '');

  return (
    <AnimationBackground animation={note.backgroundAnimation} emojis={note.emojis}>
      <main
        className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 gap-8 animate-in fade-in duration-1000"
      >
        <div className="relative max-w-3xl w-full text-center p-8 md:p-12 bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-pink-400/30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-3 rounded-full border-2 border-pink-400/30">
            <span className="text-4xl">🍓</span>
          </div>

          {note.title && (
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-pink-400 animate-in fade-in slide-in-from-bottom-5 duration-700" style={{ textShadow: '0 0 15px hotpink' }}>
              {note.title}
            </h1>
          )}

          {startDate && <RelationshipCounter startDate={startDate} />}

          <div className="space-y-6 mt-6">
            {paragraphs.map((p, index) => (
              <p
                key={index}
                className="font-body text-2xl md:text-3xl leading-relaxed text-foreground animate-in fade-in slide-in-from-bottom-5 duration-700"
                style={{ animationDelay: `${100 * (index + 1)}ms`, animationFillMode: 'backwards' }}
              >
                {p}
              </p>
            ))}
          </div>

          {embedUrl && (
            <div className="mt-12 aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          )}
        </div>

        {currentUrl && (
          <Card className="max-w-sm w-full bg-card/80 backdrop-blur-sm border-pink-400/30">
            <CardHeader>
              <CardTitle className="text-center text-pink-400">Seu QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div ref={qrCodeRef} className="p-4 bg-white rounded-lg">
                <QRCodeCanvas value={currentUrl} size={200} />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Mostre este QR Code para a pessoa amada escanear com a câmera do celular.
              </p>
              <Button onClick={handleDownload} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                <Download className="mr-2 h-4 w-4" />
                Baixar QR Code
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </AnimationBackground>
  );
}
