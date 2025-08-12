
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { CheckCircle, Award, Heart, Gift, BookOpen, Calendar, Clock, Star, Lock, Phone, Mail, ShoppingCart, Users, BadgeCheck, FileText, Palette, Sparkles, ChevronRight, Gem } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Poppins } from 'next/font/google';
import Autoplay from "embla-carousel-autoplay"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins',
});

export default function CasamentoDosSonhosPage() {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [currentDate, setCurrentDate] = useState('');
    const autoplayPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
    const testimonialsAutoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    
        const today = new Date();
        setCurrentDate(today.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

        const targetTime = new Date();
        targetTime.setMinutes(targetTime.getMinutes() + 15);

        const updateTimer = () => {
            const now = new Date();
            const difference = targetTime.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
                return;
            }

            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        };
        
        const timer = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call to avoid 1s delay

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        return () => clearInterval(timer);
    }, []);

    const faqItems = [
        { question: "Como recebo o acesso ao Método 3C?", answer: "O acesso é imediato! Após a confirmação do pagamento, você receberá um e-mail com um link para acessar a área de membros, onde encontrará o ebook, bônus e todos os materiais." },
        { question: "E se eu não gostar? Qual a garantia?", answer: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo achar que o método não é para você, basta nos enviar um e-mail e devolvemos 100% do seu dinheiro, sem burocracia." },
        { question: "O método funciona para casamentos muito pequenos ou mini-weddings?", answer: "Com certeza! O Método 3C é totalmente adaptável. Os princípios de Cortar, Criar e Combinar funcionam para qualquer tamanho de evento, de um elopement a dois até uma festa para 300 convidados." },
        { question: "Preciso de alguma ferramenta ou software caro?", answer: "Não! Todos os templates são disponibilizados em formatos comuns como PDF, Word e Google Docs. Você não precisa de nenhum software especial." },
        { question: "O método funciona para quem mora fora do Brasil?", answer: "Sim! Embora os exemplos usem a moeda local (Real), os princípios de negociação, planejamento e economia são universais e podem ser aplicados em qualquer país." },
    ];
    
    const testimonials = [
        { name: "Aline & Marcos", location: "Florianópolis, SC", text: "Me casei com 150 convidados e gastei R$6.697,70! Achei que seria impossível, mas o método mostrou o caminho. Cortamos o que não era essencial, criamos uma decoração linda e combinamos fornecedores. Mágico!", image: "https://i.imgur.com/6hNipoh.jpeg", dataAiHint: 'happy couple' },
        { name: "Juliana & Pedro", location: "Belo Horizonte, MG", text: "Economizamos mais de 10 mil reais! O guia de negociação e os templates de contrato nos salvaram de várias armadilhas. O casamento foi mais lindo do que sonhávamos.", image: "https://i.imgur.com/0lbIxMI.jpeg", dataAiHint: 'smiling couple' },
        { name: "Beatriz & Tiago", location: "São Paulo, SP", text: "Sem o Método 3C, teríamos adiado o casamento por mais um ano. Conseguimos organizar tudo em 4 meses e com um orçamento que cabia no nosso bolso. Gratidão!", image: "https://i.imgur.com/73dp13S.jpeg", dataAiHint: 'wedding couple' },
    ];

    const bonuses = [
        { icon: <FileText className="w-6 h-6 text-[#C99B5C]" />, title: "Planner & Checklist Completo", value: 97 },
        { icon: <Palette className="w-6 h-6 text-[#C99B5C]" />, title: "Paleta de Cores em Minutos", value: 79 },
        { icon: <BookOpen className="w-6 h-6 text-[#C99B5C]" />, title: "Guia do Casamento Civil", value: 67 },
        { icon: <Calendar className="w-6 h-6 text-[#C99B5C]" />, title: "Calendário da Data Perfeita", value: 59 },
        { icon: <Gift className="w-6 h-6 text-[#C99B5C]" />, title: "Guia do Enxoval Completo", value: 27 },
    ];
    
    const socialProofImages = [
        { src: "https://i.imgur.com/TQUloME.jpeg", alt: "Casamento decorado", hint: "wedding decoration" },
        { src: "https://i.imgur.com/EUrq0St.jpeg", alt: "Noivos se beijando", hint: "bride groom kissing" },
        { src: "https://i.imgur.com/0bOhq1p.jpeg", alt: "Mesa de casamento posta", hint: "wedding table setting" },
        { src: "https://i.imgur.com/h8ZCd8q.jpeg", alt: "Detalhe da decoração de casamento", hint: "wedding detail" },
    ];

    const totalBonusValue = bonuses.reduce((sum, bonus) => sum + bonus.value, 0);

    return (
        <div className={`${poppins.variable} bg-[#FBF8F6] text-[#2A2F36] font-sans`}>
            {isClient && currentDate && (
                <div className="bg-[#C99B5C] text-white text-center p-2 text-sm font-bold">
                    Hoje é {currentDate}, é o último dia para receber essa oferta
                </div>
            )}
            {/* Hero Section */}
            <section className="relative bg-[#F6E9E6] overflow-hidden">
                <div className="container mx-auto px-6 py-20 text-center relative z-10">
                    <div className="flex justify-center mb-6">
                        <Gem className="w-16 h-16 text-[#C99B5C]" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-headline text-[#2A2F36] max-w-4xl mx-auto leading-tight">
                        Método 3C : O guia oficial para ter o casamento dos seus sonhos gastando até 7 mil reais
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-[#2A2F36]/80 max-w-3xl mx-auto">
                        Aprenda o sistema prático de <strong className="text-[#C99B5C]">Cortar, Criar e Combinar</strong> que já ajudou dezenas de noivas a casar bonito sem gastar uma fortuna, Mesmo com pouco tempo e muitos convidados!
                    </p>
                    <div className="mt-10">
                        <a href="#planos">
                            <Button size="lg" className="bg-[#C99B5C] text-white font-bold text-lg px-10 py-8 rounded-lg shadow-lg hover:bg-[#b88a4e] transform hover:scale-105 transition-transform duration-300">
                                QUERO COMEÇAR AGORA
                            </Button>
                        </a>
                        <p className="mt-4 text-sm text-[#2A2F36]/70">Acesso imediato + garantia de 7 dias.</p>
                    </div>
                    <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto shadow-md border border-gray-200 text-[#2A2F36]">
                        <p className="font-bold text-[#C99B5C]">OFERTA POR TEMPO LIMITADO</p>
                        <p className="text-sm">Vagas limitadas para a turma com bônus!</p>
                        <div className="flex justify-center gap-4 mt-2 text-2xl font-bold font-sans">
                            {isClient ? (
                                <>
                                    <div>{String(timeLeft.hours).padStart(2, '0')} <span className="text-sm font-normal">HRS</span></div>
                                    <div>:</div>
                                    <div>{String(timeLeft.minutes).padStart(2, '0')} <span className="text-sm font-normal">MIN</span></div>
                                    <div>:</div>
                                    <div>{String(timeLeft.seconds).padStart(2, '0')} <span className="text-sm font-normal">SEG</span></div>
                                </>
                            ) : (
                                <span>Carregando...</span>
                            )}
                        </div>
                    </div>
                </div>
                <Image src="https://i.imgur.com/BwO8MRY.jpeg" alt="Noiva sorrindo" layout="fill" objectFit="cover" className="opacity-10" data-ai-hint="bride smiling" />
            </section>

            {/* Problem Section */}
            <section className="py-20 bg-[#FBF8F6]">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Está sem tempo, sem assessoria e com pouco dinheiro? Sei como é.</h2>
                    <p className="mt-6 text-lg text-[#2A2F36]/80">
                        Organizar um casamento pode ser um turbilhão de emoções: o sonho de um dia perfeito misturado ao pesadelo dos orçamentos que não fecham, fornecedores caros e a falta de uma orientação clara. A correria do dia a dia transforma o que deveria ser prazeroso em uma fonte de estresse.
                    </p>
                </div>
            </section>
            
            {/* Social Proof Carousel */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-2xl font-headline font-bold">Casamentos reais, sonhos realizados</h3>
                    <p className="mt-2 text-md text-[#2A2F36]/70 max-w-2xl mx-auto">Veja como o Método 3C transforma orçamentos apertados em celebrações inesquecíveis.</p>
                     <Carousel 
                        opts={{ align: "start", loop: true }}
                        plugins={[autoplayPlugin.current]}
                        onMouseEnter={() => autoplayPlugin.current.stop()}
                        onMouseLeave={() => autoplayPlugin.current.play()}
                        className="w-full max-w-6xl mx-auto mt-8"
                    >
                        <CarouselContent>
                            {socialProofImages.map((image, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-2">
                                        <Image src={image.src} alt={image.alt} width={600} height={400} className="rounded-lg shadow-lg object-cover aspect-[4/3]" data-ai-hint={image.hint} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </section>

            {/* Method Section */}
            <section className="py-20 bg-[#F6E9E6]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold mb-12">O que é o Método 3C?</h2>
                    <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <Card className="bg-white shadow-lg text-center p-4">
                            <CardHeader><CardTitle className="font-headline text-2xl text-[#C99B5C]">Cortar</CardTitle></CardHeader>
                            <CardContent className="text-[#2A2F36]/80">Aprenda a eliminar desperdícios e itens que só incham a conta sem aumentar a emoção do dia.</CardContent>
                        </Card>
                         <Card className="bg-white shadow-lg text-center p-4">
                            <CardHeader><CardTitle className="font-headline text-2xl text-[#7FBFAE]">Criar</CardTitle></CardHeader>
                            <CardContent className="text-[#2A2F36]/80">Substituições de alto impacto: DIY estratégico, fornecedores locais e decorações que parecem caras e custam pouco.</CardContent>
                        </Card>
                         <Card className="bg-white shadow-lg text-center p-4">
                            <CardHeader><CardTitle className="font-headline text-2xl text-[#C99B5C]">Combinar</CardTitle></CardHeader>
                            <CardContent className="text-[#2A2F36]/80">Como sincronizar data, horário e fornecedor para descontos incríveis e sinergias.</CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            {/* Modules Section */}
            <section className="py-20 bg-[#FBF8F6]">
              <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-headline font-bold">O que está dentro do Método 3C</h2>
                  <p className="mt-4 text-lg text-[#2A2F36]/80">Módulos práticos para um planejamento sem estresse.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F6E9E6] p-3 rounded-full"><CheckCircle className="w-6 h-6 text-[#7FBFAE]" /></div>
                      <div>
                        <h3 className="font-bold text-xl font-headline">Planejamento Rápido</h3>
                        <p className="text-[#2A2F36]/80">Checklists, orçamento realista e lista de convidados inteligente.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F6E9E6] p-3 rounded-full"><CheckCircle className="w-6 h-6 text-[#7FBFAE]" /></div>
                      <div>
                        <h3 className="font-bold text-xl font-headline">Cortar com Intenção</h3>
                        <p className="text-[#2A2F36]/80">Saiba exatamente o que reduzir e por que, sem sacrificar o sonho.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F6E9E6] p-3 rounded-full"><CheckCircle className="w-6 h-6 text-[#7FBFAE]" /></div>
                      <div>
                        <h3 className="font-bold text-xl font-headline">Criar com Estilo</h3>
                        <p className="text-[#2A2F36]/80">Decoração, vestido e flores alternativas que encantam e economizam.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                      <div className="bg-[#F6E9E6] p-3 rounded-full"><CheckCircle className="w-6 h-6 text-[#7FBFAE]" /></div>
                      <div>
                        <h3 className="font-bold text-xl font-headline">Combinar para Economizar</h3>
                        <p className="text-[#2A2F36]/80">Negocie pacotes, datas e horários para descontos incríveis.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F6E9E6] p-3 rounded-full"><CheckCircle className="w-6 h-6 text-[#7FBFAE]" /></div>
                      <div>
                        <h3 className="font-bold text-xl font-headline">Execução em Pouco Tempo</h3>
                        <p className="text-[#2A2F36]/80">O cronograma perfeito para o dia D, sem assessoria.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[#F6E9E6] p-3 rounded-full"><CheckCircle className="w-6 h-6 text-[#7FBFAE]" /></div>
                      <div>
                        <h3 className="font-bold text-xl font-headline">Modelos Práticos</h3>
                        <p className="text-[#2A2F36]/80">Templates de e-mails, contratos e checklists prontos para usar.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-[#F6E9E6]">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">Histórias Reais de Noivas Reais</h2>
                    <Carousel 
                        className="w-full max-w-4xl mx-auto"
                        plugins={[testimonialsAutoplayPlugin.current]}
                        onMouseEnter={() => testimonialsAutoplayPlugin.current.stop()}
                        onMouseLeave={() => testimonialsAutoplayPlugin.current.play()}
                        opts={{ loop: true }}
                    >
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-2 h-full">
                                        <Card className="bg-white shadow-lg p-6 flex flex-col h-full">
                                            <CardContent className="p-0 flex-grow">
                                                <div className="flex items-center mb-4">
                                                    <Avatar>
                                                        <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                                                        <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-4">
                                                        <p className="font-bold text-[#2A2F36]">{testimonial.name}</p>
                                                        <p className="text-sm text-[#2A2F36]/70">{testimonial.location}</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#2A2F36]/80 italic">“{testimonial.text}”</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
            
            {/* Bonuses Section */}
            <section className="py-20 bg-[#FBF8F6]">
              <div className="container mx-auto px-6 text-center max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Leve <span className="text-[#C99B5C]">5 Bônus Exclusivos</span> Hoje</h2>
                <p className="mt-4 text-lg text-[#2A2F36]/80">Comprando o Método 3C agora, você garante acesso a estes materiais que aceleram seu resultado:</p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  {bonuses.map((bonus, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                      {bonus.icon}
                      <div>
                        <p className="font-bold text-[#2A2F36]">{bonus.title}</p>
                        <p className="text-sm text-gray-500 line-through">Valor R${bonus.value},00</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                   <Card className="bg-white max-w-md mx-auto p-6 text-center shadow-lg border-2 border-[#C99B5C]">
                        <p className="font-bold text-xl text-[#2A2F36]">Valor total dos bônus: <span className="line-through">R$ {totalBonusValue},00</span></p>
                        <p className="text-2xl font-bold text-[#C99B5C] mt-2">Hoje saem de GRAÇA para você!</p>
                    </Card>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section id="planos" className="py-20 bg-white">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-[#2A2F36]">Escolha o plano perfeito para o seu sonho</h2>
                <p className="mt-4 text-lg text-[#2A2F36]/80 max-w-2xl mx-auto">Acesso imediato para começar a planejar hoje mesmo.</p>
                <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mt-12 items-stretch">
                  <Card className="border-2 p-8 flex flex-col bg-white text-[#2A2F36] border-gray-200">
                    <CardHeader className="p-0">
                      <CardTitle className="font-headline text-2xl text-[#2A2F36]">Plano Básico</CardTitle>
                      <CardDescription className="pt-2 text-[#2A2F36]/80">O essencial para começar a economizar.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4 pt-6 px-0 text-left">
                      <p className="text-4xl font-bold font-sans text-center text-[#2A2F36]">R$10</p>
                      <ul className="space-y-2 text-[#2A2F36]/80">
                        <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE]" /><span>Ebook Método 3C Completo</span></li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE]" /><span>Acesso por 6 meses</span></li>
                      </ul>
                    </CardContent>
                    <CardFooter className="p-0 pt-6">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="outline" className="w-full border-[#C99B5C] text-[#C99B5C] hover:bg-[#F6E9E6] hover:text-[#C99B5C]">QUERO O PLANO BÁSICO</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white text-[#2A2F36]">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center text-green-600 font-bold text-2xl">VOCÊ LIBEROU UM DESCONTO DE 30%!</AlertDialogTitle>
                                <AlertDialogDescription className="text-center text-lg text-[#2A2F36]">
                                    Para levar o <strong className="font-bold">PLANO COMPLETO</strong> de <span className="line-through">R$37</span> por apenas: 
                                    <div className="text-3xl font-bold text-[#C99B5C] my-2">R$25</div>
                                    ou 3x de R$8,82.
                                    <br/>
                                    <span className="font-bold">APROVEITE!</span> Você vai receber <strong className="font-bold">TODOS OS BÔNUS</strong>, atualizações e acesso <strong className="font-bold">VITALÍCIO</strong>. 👇
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="sm:flex-col sm:space-x-0 gap-2">
                                <AlertDialogAction asChild>
                                  <a href="https://pay.kirvano.com/42731ff0-482a-48ed-9487-a73ae6d06996" className="w-full bg-[#C99B5C] text-white hover:bg-[#b88a4e]">
                                    VOU APROVEITAR O DESCONTO!
                                  </a>
                                </AlertDialogAction>
                                <AlertDialogCancel asChild>
                                   <a href="https://pay.kirvano.com/53954f78-2de3-4144-9b88-80539a805159" className="w-full">
                                    Não, quero o básico de R$10
                                   </a>
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>

                  <Card className="border-2 border-[#C99B5C] p-8 relative flex flex-col shadow-2xl bg-white text-[#2A2F36]">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#C99B5C] text-white px-4 py-1 rounded-full text-sm font-bold">MAIS VENDIDO</div>
                    <CardHeader className="p-0">
                      <CardTitle className="font-headline text-2xl pt-2 text-[#2A2F36]">Plano Completo</CardTitle>
                      <CardDescription className="pt-2 text-[#2A2F36]/80">Tudo que você precisa para um casamento dos sonhos e econômico.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4 pt-6 px-0 text-left">
                      <p className="text-4xl font-bold font-sans text-center text-[#2A2F36]">R$37 <span className="text-base font-normal text-gray-500">ou 5x de R$8,05</span></p>
                       <ul className="space-y-2 text-sm text-[#2A2F36]/80">
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE] mt-1 flex-shrink-0" /><span>O Ebook Completo: Os Segredos do Casamento Econômico 3.0</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE] mt-1 flex-shrink-0" /><span>Checklist + Planner: Tudo que precisa ser organizado em ordem cronológica.</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE] mt-1 flex-shrink-0" /><span>O Enxoval de Casa Nova: A lista completa de itens para a sua casa.</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE] mt-1 flex-shrink-0" /><span>Como escolher sua paleta de cores em minutos: O passo a passo descomplicado.</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE] mt-1 flex-shrink-0" /><span>O Guia da data perfeita: Segredos que o mercado de casamentos esconde de você sobre a escolha do grande dia.</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE] mt-1 flex-shrink-0" /><span>Tudo sobre casamento civil.</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#7FBFAE] mt-1 flex-shrink-0" /><span>Bônus Surpresa.</span></li>
                            <li className="flex items-start gap-2"><Sparkles className="w-5 h-5 text-[#C99B5C] mt-1 flex-shrink-0" /><span>Acesso Vitalício.</span></li>
                            <li className="flex items-start gap-2"><Sparkles className="w-5 h-5 text-[#C99B5C] mt-1 flex-shrink-0" /><span>Atualizações.</span></li>
                            <li className="flex items-start gap-2"><Sparkles className="w-5 h-5 text-[#C99B5C] mt-1 flex-shrink-0" /><span>7 dias de Garantia.</span></li>
                      </ul>
                    </CardContent>
                    <CardFooter className="p-0 pt-6 flex-col items-center">
                       <Button asChild className="w-full bg-[#C99B5C] text-white hover:bg-[#b88a4e]">
                         <a href="https://pay.kirvano.com/4fb8b1a1-3006-42cc-8606-0c0a872a3ef5">QUERO O PLANO COMPLETO</a>
                       </Button>
                      <p className="mt-4 text-xs font-bold uppercase text-[#2A2F36]/80 text-center">APROVEITE AGORA, VOCÊ NÃO VAI ENCONTRAR ESSE PREÇO DEPOIS</p>
                    </CardFooter>
                  </Card>
                </div>
                <div className="mt-10 flex justify-center items-center gap-2 text-center">
                    <Lock className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-500">Pagamento seguro e 7 dias de garantia total.</p>
                </div>
              </div>
            </section>
            
            {/* Case Study Section */}
            <section className="py-20 bg-[#F6E9E6]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                        <div className="md:w-1/2">
                            <Image src="https://i.imgur.com/Tsh7t80.jpeg" width={600} height={400} alt="Casal Aline e Marcos" className="rounded-lg shadow-xl" data-ai-hint="happy couple wedding" />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-headline font-bold text-[#2A2F36]">Como a Aline aplicou o Método 3C na prática</h2>
                            <p className="mt-4 text-[#2A2F36]/80">A Aline seguiu o método à risca. Veja como foi simples:</p>
                            <ul className="mt-6 space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-[#C99B5C] text-2xl">1.</span>
                                    <div><h4 className="font-bold text-[#2A2F36]">Cortou a lista de convidados</h4><p className="text-sm text-[#2A2F36]/70">De 200 para 150 pessoas, focando em quem realmente importava.</p></div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-[#7FBFAE] text-2xl">2.</span>
                                    <div><h4 className="font-bold text-[#2A2F36]">Criou a própria decoração</h4><p className="text-sm text-[#2A2F36]/70">Usou o guia de DIY para as mesas e cerimônia, economizando R$2.500.</p></div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold text-[#C99B5C] text-2xl">3.</span>
                                    <div><h4 className="font-bold text-[#2A2F36]">Combinou fornecedores</h4><p className="text-sm text-[#2A2F36]/70">Fechou um pacote de foto e vídeo com 20% de desconto e casou em uma sexta-feira, reduzindo o custo do buffet.</p></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 text-[#2A2F36]">Perguntas Frequentes</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem value={`item-${index+1}`} key={index} className="border-b border-gray-200">
                                <AccordionTrigger className="hover:no-underline font-bold text-lg text-left text-[#2A2F36]">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-[#2A2F36]/80 pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#2A2F36] text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                         <div>
                            <h3 className="font-headline text-2xl font-bold">Método 3C</h3>
                            <p className="text-sm text-gray-400 mt-2">Casamento Completo e Econômico.</p>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="text-gray-300 hover:text-white">Política de Privacidade</a>
                            <a href="#" className="text-gray-300 hover:text-white">Termos de Uso</a>
                            <a href="#" className="text-gray-300 hover:text-white">Contato</a>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
                        <p>Copyright © 2024 - Método 3C. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
    