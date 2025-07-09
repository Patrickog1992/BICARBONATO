'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Wand2, Loader2, Music, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { generateLoveNoteSuggestion } from '@/ai/flows/generate-love-note-suggestion';
import { addNote } from '@/services/note';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from './ui/card';

const formSchema = z.object({
  userSentiment: z.enum(['romântico', 'engraçado', 'solidário'], {
    required_error: 'Por favor, selecione um sentimento.',
  }),
  relationshipLength: z.enum(['menos de 1 ano', '1-3 anos', '3+ anos'], {
    required_error: 'Por favor, selecione o tempo de relacionamento.',
  }),
  sharedMemory: z.string().optional(),
  loveNote: z
    .string()
    .min(1, { message: 'Por favor, escreva sua mensagem.' })
    .min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }),
  musicUrl: z
    .string()
    .url({ message: 'Por favor, insira uma URL válida do YouTube.' })
    .optional()
    .or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateNoteForm() {
    const router = useRouter();
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sharedMemory: '',
            musicUrl: '',
            loveNote: '',
        },
    });
    
    const formData = form.watch();

    const handleGenerateSuggestion = async () => {
        const { userSentiment, relationshipLength, sharedMemory } = form.getValues();
        if (!userSentiment || !relationshipLength) {
            toast({
                variant: 'destructive',
                title: 'Campos obrigatórios',
                description: 'Por favor, selecione o sentimento e o tempo de relacionamento para receber uma sugestão.',
            });
            return;
        }

        setIsSuggestionLoading(true);
        try {
            const result = await generateLoveNoteSuggestion({
                userSentiment,
                relationshipLength,
                sharedMemory,
            });
            form.setValue('loveNote', result.loveNote, { shouldValidate: true });
        } catch (error) {
            console.error('Error generating suggestion:', error);
            toast({
                variant: 'destructive',
                title: 'Erro ao gerar sugestão',
                description: 'Houve um problema com a IA. Por favor, tente novamente.',
            });
        } finally {
            setIsSuggestionLoading(false);
        }
    };

    async function onSubmit(values: FormData) {
        setIsSubmitting(true);
        try {
            const noteId = await addNote(values);
            router.push(`/note/${noteId}`);
        } catch (error) {
             console.error('Error creating note:', error);
            toast({
                variant: 'destructive',
                title: 'Erro ao criar a página',
                description: 'Houve um problema ao salvar sua nota. Por favor, tente novamente.',
            });
        } finally {
            setIsSubmitting(false);
        }
    }
    
    const handleNextStep = async () => {
        let fieldsToValidate: (keyof FormData)[] = [];
        if (step === 1) fieldsToValidate = ['userSentiment', 'relationshipLength'];
        if (step === 2) fieldsToValidate = ['loveNote'];
        if (step === 3) fieldsToValidate = ['musicUrl'];

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            if (step < totalSteps) setStep(prev => prev + 1);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) setStep(prev => prev - 1);
    };

    const stepHeaders = [
        { title: "Sentimento e Relacionamento", description: "Nos diga um pouco sobre vocês." },
        { title: "Sua mensagem de amor", description: "Escreva sua declaração e, se quiser, use a IA para te ajudar." },
        { title: "Música de Fundo", description: "Adicione uma música especial do YouTube para tocar ao fundo." },
        { title: "Revise e Crie!", description: "Tudo pronto! Revise as informações e crie sua página." }
    ];

    return (
        <div className="flex flex-col lg:flex-row justify-between lg:gap-24 gap-12 w-full">
            <div className="w-full lg:w-1/2">
                <div className="py-4">
                    <div className="flex items-center gap-4">
                        <Progress value={(step / totalSteps) * 100} className="w-full h-2" />
                        <p className="flex-shrink-0 text-white">{step}/{totalSteps}</p>
                    </div>
                    <div className="mt-6">
                        <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight">{stepHeaders[step-1].title}</h2>
                        <p className="text-neutral-300">{stepHeaders[step-1].description}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in">
                                <FormField
                                    control={form.control}
                                    name="userSentiment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Qual o sentimento da mensagem?</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Selecione um sentimento..." /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="romântico">Romântico</SelectItem>
                                                    <SelectItem value="engraçado">Engraçado</SelectItem>
                                                    <SelectItem value="solidário">Solidário / De apoio</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="relationshipLength"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Há quanto tempo estão juntos?</FormLabel>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                                    <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="menos de 1 ano" /></FormControl><FormLabel className="font-normal">Menos de 1 ano</FormLabel></FormItem>
                                                    <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="1-3 anos" /></FormControl><FormLabel className="font-normal">1-3 anos</FormLabel></FormItem>
                                                    <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="3+ anos" /></FormControl><FormLabel className="font-normal">3+ anos</FormLabel></FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {step === 2 && (
                             <div className="space-y-8 animate-in fade-in">
                                <FormField
                                    control={form.control}
                                    name="sharedMemory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Memória especial (opcional)</FormLabel>
                                            <FormControl><Textarea placeholder="Ex: nossa primeira viagem para a praia..." {...field} /></FormControl>
                                            <FormDescription>Inclua uma memória ou piada interna para uma sugestão mais personalizada.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="loveNote"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel>Sua mensagem de amor</FormLabel>
                                                <Button type="button" variant="ghost" size="sm" onClick={handleGenerateSuggestion} disabled={isSuggestionLoading || isSubmitting}>
                                                    {isSuggestionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                                    Gerar sugestão com IA
                                                </Button>
                                            </div>
                                            <FormControl><Textarea placeholder="Escreva aqui sua declaração..." className="min-h-[150px]" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                             </div>
                        )}
                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in">
                                <FormField
                                    control={form.control}
                                    name="musicUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">Música de fundo (opcional) <Music /></FormLabel>
                                            <FormControl><Input placeholder="Cole aqui o link de uma música do YouTube" {...field} /></FormControl>
                                            <FormDescription>A música tocará quando a pessoa abrir a página.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {step === 4 && (
                            <div className="space-y-4 animate-in fade-in">
                                <h3 className="text-lg font-semibold">Revise sua declaração:</h3>
                                <Card className="bg-neutral-900 border-neutral-700">
                                    <CardContent className="p-4 space-y-2">
                                        <p><strong>Sentimento:</strong> {form.getValues('userSentiment')}</p>
                                        <p><strong>Tempo juntos:</strong> {form.getValues('relationshipLength')}</p>
                                        <p><strong>Mensagem:</strong> {form.getValues('loveNote')}</p>
                                        {form.getValues('musicUrl') && <p><strong>Música:</strong> {form.getValues('musicUrl')}</p>}
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-4 mt-8">
                            <div>{step > 1 && (<Button type="button" onClick={handlePrevStep} variant="outline" className='bg-transparent border-neutral-700 hover:bg-neutral-800'>Voltar</Button>)}</div>
                            <div>
                                {step < totalSteps && (<Button type="button" onClick={handleNextStep}>Próxima Etapa</Button>)}
                                {step === totalSteps && (
                                    <Button type="submit" size="lg" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Criar Minha Página
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
             <div className="w-full lg:w-1/2 h-full hidden lg:block">
              <div className="sticky top-24">
                  <div className="relative mx-auto border-neutral-800 bg-neutral-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl">
                      <div className="w-[120px] h-[18px] bg-neutral-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[150px] rounded-s-lg"></div>
                      <div className="h-[54px] w-[3px] bg-neutral-800 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black p-4 flex flex-col items-center justify-center">
                          <div className="text-white space-y-4">
                              <Heart className="w-12 h-12 text-accent mx-auto" fill="hsl(var(--accent))" />
                              <p className="text-center font-body text-xl leading-relaxed">{formData.loveNote || "Sua mensagem aparecerá aqui."}</p>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    )
}
