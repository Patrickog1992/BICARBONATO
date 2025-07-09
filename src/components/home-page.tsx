'use client';

import { useState } from 'react';
import Image from 'next/image';
import { generateLoveNoteSuggestion } from '@/ai/flows/generate-love-note-suggestion';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Logo } from '@/components/logo';
import { Sparkles, Loader2, Download, Share2, ClipboardCopy } from "lucide-react";

export default function HomePage() {
  const { toast } = useToast();
  const [note, setNote] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [isQrLoading, setIsQrLoading] = useState(false);

  // AI Suggestion State
  const [sentiment, setSentiment] = useState('');
  const [relationshipLength, setRelationshipLength] = useState('');
  const [sharedMemory, setSharedMemory] = useState('');

  const handleGenerateSuggestion = async () => {
    if (!sentiment || !relationshipLength) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select a sentiment and relationship length.',
      });
      return;
    }
    setIsNoteLoading(true);
    try {
      const result = await generateLoveNoteSuggestion({
        userSentiment: sentiment,
        relationshipLength,
        sharedMemory,
      });
      setNote(result.loveNote);
      toast({
        title: 'Suggestion generated!',
        description: 'Your new love note is ready to be edited.',
      });
    } catch (error) {
      console.error('Error generating love note:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem generating your love note.',
      });
    } finally {
      setIsNoteLoading(false);
    }
  };

  const handleGenerateQrCode = () => {
    if (note.trim().length < 10) {
      toast({
        variant: 'destructive',
        title: 'Note is too short',
        description: 'Please write a note of at least 10 characters.',
      });
      return;
    }
    setIsQrLoading(true);
    const baseUrl = `${window.location.origin}/note`;
    const noteUrl = `${baseUrl}?content=${encodeURIComponent(note)}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(noteUrl)}&qzone=1&color=4A148C&bgcolor=FCE4EC`;
    
    // Preload image to avoid showing a broken image while loading
    const img = new window.Image();
    img.src = qrApiUrl;
    img.onload = () => {
        setQrCodeUrl(qrApiUrl);
        setIsQrLoading(false);
    };
    img.onerror = () => {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not generate QR code.' });
        setIsQrLoading(false);
    }
  };
  
  const handleDownload = async () => {
    if (!qrCodeUrl) return;
    try {
      // The API doesn't support CORS for fetch, so we use a proxy or direct link
      // For simplicity, a direct link approach is used.
      const link = document.createElement('a');
      link.href = qrCodeUrl.replace('&qzone=1',''); // The API URL itself can be used to download
      link.target = '_blank';
      link.download = 'qr-love-note.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      toast({ variant: 'destructive', title: 'Download Failed', description: 'Could not download the QR code.' });
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/note?content=${encodeURIComponent(note)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A Love Note For You',
          text: 'I made something special for you!',
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link Copied!',
        description: (
          <div className="flex items-center">
            <ClipboardCopy className="mr-2 h-4 w-4" />
            <span>URL copied to clipboard.</span>
          </div>
        ),
      });
    }
  };


  return (
    <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <header className="mb-8">
        <Logo />
      </header>

      <div className="w-full max-w-2xl space-y-8">
        <Card className="shadow-lg animate-in fade-in-0 zoom-in-95 duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Create Your Love Note</CardTitle>
            <CardDescription>Write a message from the heart or let our AI help you find the words.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="To my dearest..."
              className="min-h-[150px] text-lg"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Need inspiration? Get help from AI
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sentiment">Sentiment</Label>
                      <Select value={sentiment} onValueChange={setSentiment}>
                        <SelectTrigger id="sentiment"><SelectValue placeholder="Select sentiment" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Romantic">Romantic</SelectItem>
                          <SelectItem value="Funny">Funny</SelectItem>
                          <SelectItem value="Supportive">Supportive</SelectItem>
                          <SelectItem value="Heartfelt">Heartfelt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length">Relationship Length</Label>
                      <Select value={relationshipLength} onValueChange={setRelationshipLength}>
                        <SelectTrigger id="length"><SelectValue placeholder="Select duration" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New (&lt; 1 year)</SelectItem>
                          <SelectItem value="medium">Established (1-5 years)</SelectItem>
                          <SelectItem value="long">Long-term (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memory">Shared Memory (optional)</Label>
                    <Input id="memory" placeholder="e.g., our trip to the beach" value={sharedMemory} onChange={(e) => setSharedMemory(e.target.value)} />
                  </div>
                  <Button onClick={handleGenerateSuggestion} disabled={isNoteLoading}>
                    {isNoteLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Suggestion
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handleGenerateQrCode} disabled={isQrLoading}>
              {isQrLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>}
              Generate QR Love Note
            </Button>
          </CardFooter>
        </Card>

        {qrCodeUrl && (
          <Card className="shadow-lg animate-in fade-in-0 zoom-in-95 duration-500">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Your Note is Ready!</CardTitle>
              <CardDescription>Share this QR code with your special someone.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image src={qrCodeUrl} alt="Generated Love Note QR Code" width={300} height={300} className="rounded-lg border-4 border-white shadow-2xl" data-ai-hint="qr code"/>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="w-full" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button size="lg" className="w-full" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}