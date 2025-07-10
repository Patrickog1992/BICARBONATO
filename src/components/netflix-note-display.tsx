'use client';

import type { NoteData } from '@/services/note';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NetflixNoteDisplayProps {
    note: NoteData;
    currentUrl: string;
}

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

export default function NetflixNoteDisplay({ note, currentUrl }: NetflixNoteDisplayProps) {
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);

    useEffect(() => {
        if (note.musicUrl) {
            setEmbedUrl(getYouTubeEmbedUrl(note.musicUrl));
        }
    }, [note.musicUrl]);

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
    
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-black p-4 sm:p-8 text-white">
            <main className="w-full max-w-5xl mx-auto my-8 flex flex-col items-center gap-8">
                <div className="w-full rounded-lg bg-[#141414]">
                    <div className="relative">
                        {note.images && note.images.length > 0 ? (
                            <Image src={note.images[0]} alt="Hero" width={1280} height={720} className="w-full h-auto object-cover rounded-t-md" />
                        ) : (
                            <div className="w-full aspect-video bg-neutral-800 rounded-t-md flex items-center justify-center text-neutral-500">
                                <p>Episódio Principal</p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-6 md:left-6">
                            <Image src="https://i.imgur.com/SgK6WMs.png" alt="Netflix Logo" width={120} height={32} />
                        </div>
                        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-left">
                            <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>{note.title}</h1>
                        </div>
                    </div>
                    
                    <div className="p-4 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                {note.startDate && (
                                    <div className='space-y-2 mb-4'>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-green-400 font-semibold">Estreou em {format(new Date(note.startDate), "PPP", { locale: ptBR })}</p>
                                            <span className="bg-neutral-600 text-white text-[10px] font-bold px-1.5 rounded-sm">HD</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-red-600 text-white font-bold text-sm px-2 py-1 rounded">
                                                TOP<span className="text-xs">10</span>
                                            </div>
                                            <p className="text-sm font-semibold text-white">Em alta no momento</p>
                                        </div>
                                    </div>
                                )}
                                <p className="text-base whitespace-pre-wrap text-neutral-200">{note.loveNote}</p>
                            </div>
                            <div>
                                {embedUrl && (
                                    <div className="aspect-video mb-4">
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
                        </div>

                        {note.images && note.images.length > 1 && (
                            <div className="pt-8">
                                <h2 className="text-2xl font-bold mb-4">Mais episódios</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {note.images.slice(1).map((src, index) => (
                                        <div key={index} className="relative aspect-video rounded-md overflow-hidden group cursor-pointer">
                                            <Image src={src} alt={`Episódio ${index + 2}`} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/40"></div>
                                            <p className="absolute bottom-2 left-2 text-sm font-bold bg-black/60 px-2 py-1 rounded">E{index + 2}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {currentUrl && (
                  <Card className="max-w-sm w-full bg-[#141414] border-neutral-700">
                    <CardHeader>
                      <CardTitle className="text-center text-white">Seu QR Code</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                      <div ref={qrCodeRef} className="p-4 bg-white rounded-lg">
                        <QRCodeCanvas value={currentUrl} size={200} />
                      </div>
                      <p className="text-sm text-neutral-400 text-center">
                        Mostre este QR Code para a pessoa amada escanear com a câmera do celular.
                      </p>
                      <Button onClick={handleDownload} variant="destructive" className="w-full bg-[#E50914] hover:bg-[#f6121d]">
                        <Download className="mr-2 h-4 w-4" />
                        Baixar QR Code
                      </Button>
                    </CardContent>
                  </Card>
                )}
            </main>
        </div>
    );
}
