'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { addNote } from '@/services/note';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';

const formSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  loveNote: z.string().min(1, { message: 'A mensagem não pode estar vazia.' }),
  musicUrl: z.string().optional(),
  startDate: z.date().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateNoteForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 8;
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            loveNote: '',
            musicUrl: '',
            startDate: undefined,
        },
    });
    
    const formData = form.watch();

    async function onSubmit(values: FormData) {
        setIsSubmitting(true);
        try {
            const noteData = {
                title: values.title,
                loveNote: values.loveNote,
                musicUrl: values.musicUrl,
                startDate: values.startDate,
            }
            const noteId = await addNote(noteData);
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
        if (step === 1) fieldsToValidate = ['title'];
        if (step === 2) fieldsToValidate = ['loveNote'];

        const isValid = fieldsToValidate.length > 0 ? await form.trigger(fieldsToValidate) : true;
        if (isValid) {
            if (step < totalSteps) {
                setStep(prev => prev + 1);
            }
        }
    };

    const handlePrevStep = () => {
        if (step > 1) setStep(prev => prev - 1);
    };

    const stepHeaders = [
        { title: "Título da página", description: "Escreva o titulo dedicatório para a página. Ex: João & Maria ou Feliz Aniversário ou etc!" },
        { title: "Sua mensagem", description: "Escreva uma mensagem especial. Seja criativo e demonstre todo seu carinho." },
        { title: "Data de início", description: "Informe a data de início que simbolize o início de uma união, relacionamento, amizade, etc." },
        { title: "Fotos", description: "Anexe fotos e escolha o modo de exibição para personalizar a página." },
        { title: "Música dedicada", description: "Dedique uma música especial para tocar ao fundo." },
        { title: "Animação de fundo", description: "Escolha uma animação de fundo para a página." },
        { title: "Informações de contato", description: "Preencha as informações de contato para receber o QR code e o link." },
        { title: "Revise e Crie!", description: "Tudo pronto! Revise as informações e crie sua página." }
    ];
    
    const isNextDisabled =
      (step === 1 && (!form.watch('title') || !!form.formState.errors.title)) ||
      (step === 2 && (!form.watch('loveNote') || !!form.formState.errors.loveNote));

    return (
        <div className="flex flex-col lg:flex-row justify-between lg:gap-24 gap-12 w-full">
            <div className="w-full lg:w-1/2">
                <div className="py-4">
                    <div className="flex items-center gap-4">
                        <Progress value={(step / totalSteps) * 100} className="w-full h-2" />
                        <p className="flex-shrink-0 text-white">{step}/{totalSteps}</p>
                    </div>
                    <div className="mt-6">
                        <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white text-3xl lg:text-4xl font-sans py-2 relative z-20 font-bold tracking-tight">
                            {stepHeaders[step-1]?.title || `Etapa ${step}`}
                        </h2>
                        <p className="text-neutral-300">{stepHeaders[step-1]?.description || ''}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input 
                                                    placeholder="Ex: João & Maria ou Feliz Aniversário ou etc" 
                                                    {...field} 
                                                />
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
                                    name="loveNote"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Escreva uma mensagem especial. Seja criativo e demonstre todo seu carinho."
                                                    {...field}
                                                    className="min-h-[200px]"
                                                />
                                            </FormControl>
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
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? (
                                                                format(field.value, "PPP", { locale: ptBR })
                                                            ) : (
                                                                <span>Selecione uma data</span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                        locale={ptBR}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        
                        <div className="flex items-center justify-between gap-4 mt-8">
                           <div>
                                {step > 1 && (<Button type="button" onClick={handlePrevStep} variant="outline" className='bg-transparent border-neutral-700 hover:bg-neutral-800'>Voltar etapa</Button>)}
                           </div>
                           <div>
                                {step < totalSteps ? (
                                    <Button type="button" onClick={handleNextStep} disabled={isNextDisabled}>
                                        Próxima etapa
                                    </Button>
                                ) : (
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
             <div className="w-full lg:w-1/2 h-full">
              <div className="sticky top-24">
                  <Card className="relative mx-auto border-neutral-800 bg-neutral-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl">
                      <div className="w-[120px] h-[18px] bg-neutral-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[150px] rounded-s-lg"></div>
                      <div className="h-[54px] w-[3px] bg-neutral-800 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                      <CardContent className="rounded-[2rem] overflow-hidden w-full h-full bg-black p-4 flex flex-col items-center justify-start pt-8 text-center">
                          <div className="text-white space-y-4">
                              <h1 className="font-headline text-2xl font-bold">{formData.title || "Seu título aparecerá aqui"}</h1>
                              <p className="font-body text-sm whitespace-pre-wrap">{formData.loveNote || "Sua mensagem aparecerá aqui."}</p>
                          </div>
                      </CardContent>
                  </Card>
              </div>
            </div>
        </div>
    )
}
