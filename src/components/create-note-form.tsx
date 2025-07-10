
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CalendarIcon, Loader2, Music, Sparkles, Upload, Mail, Phone, CheckCircle, Package } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';

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
import { useToast } from '@/hooks/use-toast';
import { addNote } from '@/services/note';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import RelationshipCounter from './relationship-counter';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimationBackground from './animation-background';
import { Label } from '@/components/ui/label';
import type { ClientNoteData } from '@/services/note';

const formSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres.' }),
  loveNote: z.string().min(1, { message: 'A mensagem não pode estar vazia.' }),
  musicUrl: z.string().url({ message: 'Por favor, insira uma URL válida.' }).optional().or(z.literal('')),
  startDate: z.date().optional(),
  backgroundAnimation: z.string().optional(),
  emojis: z.string().optional(),
  email: z.string().min(1, { message: 'O e-mail é obrigatório.' }).email({ message: 'Por favor, insira um e-mail válido.' }),
  phone: z.string().optional(),
  plan: z.string({ required_error: 'Por favor, selecione um plano.' }),
});

type FormData = z.infer<typeof formSchema>;

const animationNames: { [key: string]: string } = {
    'none': 'Nenhuma',
    'hearts': 'Chuva de corações',
    'comets': 'Céu Estrelado com Cometas',
    'meteors': 'Céu Estrelado com Meteoros',
    'aurora': 'Aurora',
    'clouds': 'Nuvens',
    'emojis': 'Emojis'
};

export default function CreateNoteForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 8;
    const { toast } = useToast();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            loveNote: '',
            musicUrl: '',
            startDate: undefined,
            backgroundAnimation: 'none',
            emojis: '',
            email: '',
            phone: '',
            plan: 'forever',
        },
    });
    
    const formData = form.watch();

    async function onSubmit(values: FormData) {
        setIsSubmitting(true);
        try {
            const noteData: ClientNoteData = {
                title: values.title,
                loveNote: values.loveNote,
                email: values.email,
                plan: values.plan,
            };

            if (values.musicUrl) noteData.musicUrl = values.musicUrl;
            if (values.phone) noteData.phone = values.phone;
            if (values.backgroundAnimation) noteData.backgroundAnimation = values.backgroundAnimation;
            if (values.emojis) noteData.emojis = values.emojis;
            
            // Convert date to ISO string before sending to server
            if (values.startDate) {
                noteData.startDate = values.startDate.toISOString();
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        if (images.length + files.length > 8) {
            toast({
                variant: 'destructive',
                title: 'Limite de fotos excedido',
                description: 'Você pode adicionar no máximo 8 fotos.',
            });
            return;
        }

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prevImages => [...prevImages, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };
    
    const handleNextStep = async () => {
        let fieldsToValidate: (keyof FormData)[] = [];
        if (step === 1) fieldsToValidate = ['title'];
        if (step === 2) fieldsToValidate = ['loveNote'];
        if (step === 7) fieldsToValidate = ['email'];
        if (step === 8) fieldsToValidate = ['plan'];

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
        { title: "Fotos", description: "Anexe fotos e escolha o modo de exibição para personalizar a página. Você pode adicionar até 8 fotos." },
        { title: "Música dedicada", description: "Dedique uma música especial para tocar ao fundo. Cole o link do YouTube." },
        { title: "Animação de fundo", description: "Escolha uma animação de fundo para a página. Você pode escolher entre as opções abaixo." },
        { title: "Informações de contato", description: "Preencha as informações de contato para receber o QR code e o link da página personalizada." },
        { title: "Plano Ideal", description: "Escolha o plano ideal para sua página. Você pode escolher entre os planos abaixo." },
        { title: "Revise e Crie!", description: "Tudo pronto! Revise as informações e crie sua página." }
    ];
    
    const isNextDisabled =
      (step === 1 && (!form.watch('title') || !!form.formState.errors.title)) ||
      (step === 2 && (!form.watch('loveNote') || !!form.formState.errors.loveNote)) ||
      (step === 7 && (!form.watch('email') || !!form.formState.errors.email));
      
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
                        {step === 4 && (
                            <div className="space-y-8 animate-in fade-in">
                                <FormItem>
                                    <FormControl>
                                        <div className="relative w-full h-48 border-2 border-dashed border-neutral-700 rounded-lg flex flex-col justify-center items-center text-center cursor-pointer hover:border-neutral-500 transition-colors">
                                            <Upload className="w-8 h-8 text-neutral-500" />
                                            <span className="mt-2 text-sm text-neutral-400">Clique para adicionar fotos</span>
                                            <span className="text-xs text-neutral-500">PNG, JPG, JPEG, GIF (máx. 8 fotos)</span>
                                            <Input
                                                id="image-upload"
                                                type="file"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                accept="image/png, image/jpeg, image/gif"
                                                multiple
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </FormControl>
                                    {images && images.length > 0 && (
                                        <div className="mt-4 grid grid-cols-4 gap-2">
                                            {images.map((src, index) => (
                                                <div key={index} className="relative aspect-square">
                                                    <Image src={src} alt={`Preview ${index + 1}`} fill className="rounded-md object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            </div>
                        )}
                        {step === 5 && (
                          <div className="space-y-8 animate-in fade-in">
                            <FormField
                              control={form.control}
                              name="musicUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className='text-white'>Link da música do YouTube</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Ex: https://www.youtube.com/watch?v=..."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    A música será reproduzida automaticamente.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                         {step === 6 && (
                            <div className="space-y-8 animate-in fade-in">
                                <FormField
                                    control={form.control}
                                    name="backgroundAnimation"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="none" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-white">Nenhuma</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="hearts" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-white">Chuva de corações</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="comets" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-white">Céu Estrelado com Cometas</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="meteors" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-white">Céu Estrelado com Meteoros</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="aurora" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-white">Aurora</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="clouds" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-white">Nuvens</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="emojis" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-white">ou escolha 3 emojis</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            
                                            {field.value === 'emojis' && (
                                                <div className="pt-4 animate-in fade-in">
                                                    <FormField
                                                        control={form.control}
                                                        name="emojis"
                                                        render={({ field: emojiField }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-white">Seus Emojis</FormLabel>
                                                                <FormControl>
                                                                    <Input 
                                                                        placeholder="Ex: ❤️✨🎉" 
                                                                        {...emojiField} 
                                                                    />
                                                                </FormControl>
                                                                <FormDescription>
                                                                    Cole os emojis para a animação.
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {step === 7 && (
                            <div className="space-y-8 animate-in fade-in">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-white'>E-mail</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                                    <Input placeholder="Ex: seu.email@gmail.com" {...field} className="pl-10" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-white'>Telefone</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                                    <Input placeholder="Ex: (99) 99999-9999" {...field} className="pl-10" />
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Opcional.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {step === 8 && (
                           <div className="space-y-8 animate-in fade-in">
                                <FormField
                                    control={form.control}
                                    name="plan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                                                >
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="forever" id="forever" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="forever" className="cursor-pointer">
                                                            <Card className={`relative border-2 bg-neutral-900 h-full ${field.value === 'forever' ? 'border-primary' : 'border-neutral-800'}`}>
                                                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full font-bold">Recomendado</div>
                                                                <CardHeader className="pt-8">
                                                                    <CardTitle>Para sempre</CardTitle>
                                                                    <CardDescription>Esse plano é vitalício, não precisa renovar.</CardDescription>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4 text-left">
                                                                    <ul className="space-y-2 text-sm text-neutral-300">
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Texto dedicado</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Contador em tempo real</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Data de início</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>QR Code exclusivo</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Máximo de 8 imagens</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Com música</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Fundo dinâmico</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Com animações exclusivas</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>URL personalizada</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Suporte 24 horas</li>
                                                                    </ul>
                                                                </CardContent>
                                                                <CardFooter className="flex flex-col items-start pt-4">
                                                                    <p className="text-neutral-400"><span className="line-through">R$ 54,00</span></p>
                                                                    <p className="text-3xl font-bold my-2">R$ 27,00 <span className="text-sm font-normal text-neutral-400">/uma vez</span></p>
                                                                </CardFooter>
                                                            </Card>
                                                        </Label>
                                                    </FormItem>
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroupItem value="annual" id="annual" className="sr-only" />
                                                        </FormControl>
                                                        <Label htmlFor="annual" className="cursor-pointer">
                                                             <Card className={`border-2 bg-neutral-900 h-full ${field.value === 'annual' ? 'border-primary' : 'border-neutral-800'}`}>
                                                                <CardHeader>
                                                                    <CardTitle>Anual</CardTitle>
                                                                    <CardDescription>Esse plano possui um período de 1 ano.</CardDescription>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4 text-left">
                                                                    <ul className="space-y-2 text-sm text-neutral-300">
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Texto dedicado</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Contador em tempo real</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Data de início</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>QR Code exclusivo</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Máximo de 4 imagens</li>
                                                                        <li className="flex items-center text-neutral-500 line-through"><CheckCircle className="text-neutral-600 mr-2" size={16}/>Sem música</li>
                                                                        <li className="flex items-center text-neutral-500 line-through"><CheckCircle className="text-neutral-600 mr-2" size={16}/>Sem fundo dinâmico</li>
                                                                        <li className="flex items-center text-neutral-500 line-through"><CheckCircle className="text-neutral-600 mr-2" size={16}/>Sem animações exclusivas</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>URL personalizada</li>
                                                                        <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Suporte 24 horas</li>
                                                                    </ul>
                                                                </CardContent>
                                                                <CardFooter className="flex flex-col items-start pt-4">
                                                                    <p className="text-neutral-400"><span className="line-through">R$ 34,00</span></p>
                                                                    <p className="text-3xl font-bold my-2">R$ 17,00 <span className="text-sm font-normal text-neutral-400">/por ano</span></p>
                                                                </CardFooter>
                                                            </Card>
                                                         </Label>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
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
                      <CardContent className="rounded-[2rem] overflow-auto w-full h-full bg-black p-0">
                           <AnimationBackground animation={formData.backgroundAnimation} emojis={formData.emojis}>
                            <div className="text-white space-y-2 text-center p-4 pt-8">
                                <h1 className="font-headline text-2xl font-bold text-red-500">{formData.title || "Seu título aparecerá aqui"}</h1>
                                {formData.startDate && <RelationshipCounter startDate={formData.startDate} />}
                                <p className="font-body text-sm whitespace-pre-wrap">{formData.loveNote || "Sua mensagem aparecerá aqui."}</p>
                                {images && images.length > 0 && (
                                    <div className="mt-4 w-full">
                                        <Carousel className="w-full max-w-xs mx-auto">
                                            <CarouselContent>
                                                {images.map((src, index) => (
                                                    <CarouselItem key={index}>
                                                        <Image src={src} alt={`Preview ${index + 1}`} width={200} height={200} className="rounded-md object-cover w-full aspect-square" />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious className="left-[-24px] text-white" />
                                            <CarouselNext className="right-[-24px] text-white" />
                                        </Carousel>
                                    </div>
                                )}
                                {formData.musicUrl && (
                                    <div className="mt-4 p-2 bg-neutral-800 rounded-md flex items-center gap-2">
                                        <Music className="w-5 h-5 text-white" />
                                        <p className="text-xs text-white truncate">Música selecionada</p>
                                    </div>
                                )}
                            </div>
                           </AnimationBackground>
                      </CardContent>
                  </Card>
              </div>
            </div>
        </div>
    )
}

    