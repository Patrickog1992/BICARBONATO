'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Wand2, Loader2, Music } from 'lucide-react';

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
import { toast } from '@/hooks/use-toast';
import { generateLoveNoteSuggestion } from '@/ai/flows/generate-love-note-suggestion';
import { Card, CardContent } from '@/components/ui/card';


const formSchema = z.object({
  userSentiment: z.enum(['romântico', 'engraçado', 'solidário'], {
    required_error: 'Por favor, selecione um sentimento.',
  }),
  relationshipLength: z.enum(['menos de 1 ano', '1-3 anos', '3+ anos'], {
    required_error: 'Por favor, selecione o tempo de relacionamento.',
  }),
  sharedMemory: z.string().optional(),
  musicUrl: z
    .string()
    .url({ message: 'Por favor, insira uma URL válida do YouTube.' })
    .optional()
    .or(z.literal('')),
  loveNote: z
    .string()
    .min(1, { message: 'Por favor, escreva sua mensagem.' })
    .min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }),
});

export default function CreateNoteForm() {
    const router = useRouter();
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sharedMemory: '',
            musicUrl: '',
            loveNote: '',
        },
    });

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        const content = encodeURIComponent(values.loveNote);
        const musicUrl = values.musicUrl ? encodeURIComponent(values.musicUrl) : '';
        router.push(`/note?content=${content}&musicUrl=${musicUrl}`);
    }


    return (
        <Card className="border-primary/20">
             <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="userSentiment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Qual o sentimento da mensagem?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um sentimento..." />
                                                </SelectTrigger>
                                            </FormControl>
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
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl><RadioGroupItem value="menos de 1 ano" /></FormControl>
                                                    <FormLabel className="font-normal">Menos de 1 ano</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl><RadioGroupItem value="1-3 anos" /></FormControl>
                                                    <FormLabel className="font-normal">1-3 anos</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl><RadioGroupItem value="3+ anos" /></FormControl>
                                                    <FormLabel className="font-normal">3+ anos</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="sharedMemory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Memória especial (opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ex: nossa primeira viagem para a praia..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Inclua uma memória ou piada interna para uma sugestão mais personalizada.
                                    </FormDescription>
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
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleGenerateSuggestion}
                                            disabled={isSuggestionLoading}
                                        >
                                            {isSuggestionLoading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Wand2 className="mr-2 h-4 w-4" />
                                            )}
                                            Gerar sugestão com IA
                                        </Button>
                                    </div>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Escreva aqui sua declaração..."
                                            className="min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                         <FormField
                            control={form.control}
                            name="musicUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">Música de fundo (opcional) <Music /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Cole aqui o link de uma música do YouTube" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                       A música tocará quando a pessoa abrir a página.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="text-center md:text-right pt-4">
                            <Button type="submit" size="lg">Criar Minha Página</Button>
                        </div>
                    </form>
                </Form>
             </CardContent>
        </Card>
    )
}
