'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, CheckCircle, Star, Heart, Calendar, Music, Globe, QrCode, Lock, Menu, Languages, UserCircle, Rocket, Sparkles } from 'lucide-react';

import { Logo } from '@/components/logo';

// Helper component for star ratings
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))}
  </div>
);

export default function HomePage() {
  const testimonials = [
    { name: "Mariana e João", time: "1 mês atrás", text: "Adorei a experiência! Pude criar uma página especial para o João com nossas fotos favoritas, uma playlist personalizada e um texto que representa nossa história. Ele ficou super emocionado quando viu!", image: "https://placehold.co/48x48.png", dataAiHint: "couple portrait" },
    { name: "Ana e Pedro", time: "2 dias atrás", text: "Com a CodeLove, pude expressar meu amor de um jeito totalmente diferente. Adorei criar uma página só para nós dois.", image: "https://placehold.co/48x48.png", dataAiHint: "happy couple" },
    { name: "Lucas e Carol", time: "3 meses atrás", text: "Montei uma página surpresa para a Carol, com nossas fotos de viagem e uma mensagem sincera. Ela adorou! Com certeza vou usar de novo.", image: "https://placehold.co/48x48.png", dataAiHint: "traveling couple" },
    { name: "Camila e Felipe", time: "4 meses atrás", text: "A interface é simples e criar uma página com nossas fotos e músicas favoritas foi super especial!", image: "https://placehold.co/48x48.png", dataAiHint: "smiling couple" },
    { name: "Bia e Henrique", time: "1 ano atrás", text: "A página ficou incrível e personalizada! Ele não esperava por algo tão emocionante.", image: "https://placehold.co/48x48.png", dataAiHint: "laughing couple" },
    { name: "Clara e Rafael", time: "2 meses atrás", text: "Usar o CodeLove foi incrível! A plataforma é muito intuitiva e fácil de usar. Conseguimos montar um presente digital perfeito com músicas que marcaram nossa relação.", image: "https://placehold.co/48x48.png", dataAiHint: "couple hug" },
    { name: "Vanessa e Ricardo", time: "1 semana atrás", text: "CodeLove tornou nosso relacionamento ainda mais especial. Ele amou a surpresa cheia de memórias.", image: "https://placehold.co/48x48.png", dataAiHint: "couple memories" },
    { name: "Carla e Bruno", time: "4 meses atrás", text: "Comemoramos nosso primeiro ano juntos de uma forma muito especial. A página personalizada foi o presente perfeito!", image: "https://placehold.co/48x48.png", dataAiHint: "celebrating couple" },
    { name: "Larissa e Tiago", time: "9 meses atrás", text: "Ele não esperava por uma surpresa tão personalizada. Foi emocionante montar essa página com tudo o que amamos.", image: "https://placehold.co/48x48.png", dataAiHint: "surprised couple" },
  ];
  
  const faqItems = [
    { question: "O que é a CodeLove?", answer: "CodeLove é uma plataforma que permite criar páginas personalizadas para pessoas especiais, transformando suas memórias em uma declaração de amor digital e eterna." },
    { question: "Como posso criar uma página personalizada na CodeLove?", answer: "É muito simples! Basta clicar em 'Criar minha página', personalizar sua página com textos e músicas, e você receberá o link para compartilhar com seu amor." },
    { question: "O que está incluído na minha página personalizada?", answer: "Sua página inclui uma mensagem de amor personalizada e pode ter uma música de fundo do YouTube. Em breve, você também poderá adicionar fotos e muito mais!" },
    { question: "Como recebo minha página personalizada após o pagamento?", answer: "Após a confirmação do pagamento, você receberá um e-mail com o link de acesso e o QR Code da sua página personalizada." },
    { question: "A página personalizada tem validade?", answer: "Oferecemos dois planos. O plano 'Para Sempre' é vitalício e não expira. O plano 'Anual' tem validade de um ano, podendo ser renovado." },
    { question: "Quanto tempo leva para receber o QR Code por email?", answer: "O envio é quase instantâneo após a confirmação do pagamento. Geralmente, leva apenas alguns minutos." },
    { question: "Quais são as formas de pagamento aceitas?", answer: "Aceitamos as principais formas de pagamento, incluindo cartão de crédito, débito e Pix. Também processamos pagamentos internacionais." },
    { question: "Como posso entrar em contato com o suporte ao cliente?", answer: "Você pode entrar em contato conosco através do formulário de contato no site ou pelo e-mail de suporte. Oferecemos suporte 24 horas." },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-center p-2 text-sm font-bold">
        ✨ Apenas hoje 09/07/2025 - Todos os planos com 50% de desconto, aproveite!
      </div>
      
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#inicio" className="hover:text-primary">Início</a>
          <a href="#como-funciona" className="hover:text-primary">Como funciona?</a>
          <a href="#temas" className="hover:text-primary">Temas</a>
          <a href="#planos" className="hover:text-primary">Planos</a>
          <a href="#faq" className="hover:text-primary">F.A.Q</a>
        </nav>
        <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm"><Languages className="mr-2 h-4 w-4"/> Selecionar Idioma</Button>
            <Button variant="outline" size="sm"><UserCircle className="mr-2 h-4 w-4"/>Minha conta</Button>
            <Button size="sm" asChild><Link href="/create"><Rocket className="mr-2 h-4 w-4"/>Vamos começar?</Link></Button>
        </div>
        <div className="md:hidden">
            <Button variant="ghost" size="icon"><Menu /></Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="inicio" className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Declare seu amor<br/>para seu amor!</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
          Crie uma página personalizada para quem você ama e surpreenda a pessoa com uma declaração especial que ficará para sempre.
        </p>
        <Button size="lg" asChild><Link href="/create">Criar minha página</Link></Button>
        <div className="mt-8 flex justify-center items-center gap-4">
            <div className="flex -space-x-2">
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 1" data-ai-hint="couple"/>
                    <AvatarFallback>C1</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 2" data-ai-hint="couple"/>
                    <AvatarFallback>C2</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 3" data-ai-hint="couple"/>
                    <AvatarFallback>C3</AvatarFallback>
                </Avatar>
                 <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 4" data-ai-hint="couple"/>
                    <AvatarFallback>C4</AvatarFallback>
                </Avatar>
                 <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 5" data-ai-hint="couple"/>
                    <AvatarFallback>C5</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-sm text-muted-foreground">Mais de <strong>40.325</strong> usuários satisfeitos</p>
        </div>
         <div className="mt-12 px-4">
          <Image src="https://placehold.co/1200x600.png" alt="Mockup da página de amor" width={1200} height={600} className="rounded-lg shadow-2xl mx-auto" data-ai-hint="website mockup"/>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Como funciona?</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">Crie sua página em poucos passos. Personalize uma página especial para surpreender alguém querido. O processo é simples e rápido.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">1</div>
                <h3 className="font-bold text-lg mb-2">Personalize</h3>
                <p className="text-muted-foreground text-sm">Personalize sua página com fotos, mensagens, efeitos especiais e muito mais.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">2</div>
                <h3 className="font-bold text-lg mb-2">Faça o pagamento</h3>
                <p className="text-muted-foreground text-sm">Escolha seu plano preferido e faça o pagamento de forma rápida e segura.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">3</div>
                <h3 className="font-bold text-lg mb-2">Receba seu acesso</h3>
                <p className="text-muted-foreground text-sm">Você receberá por email um QR code e link para acessar sua página.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">4</div>
                <h3 className="font-bold text-lg mb-2">Compartilhe o amor</h3>
                <p className="text-muted-foreground text-sm">Compartilhe a página com a pessoa amada e surpreenda-a de forma especial.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <p className="text-primary font-bold mb-2">Vários Recursos</p>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Recursos Exclusivos</h2>
                <p className="text-muted-foreground mb-8">Nossa plataforma oferece recursos incríveis para você criar a página personalizada perfeita</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                        <Calendar className="text-primary flex-shrink-0 w-6 h-6"/>
                        <div>
                            <h4 className="font-bold">Contador de tempo</h4>
                            <p className="text-sm text-muted-foreground">Mostre há quanto tempo vocês estão juntos com um contador em tempo real.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Sparkles className="text-primary flex-shrink-0 w-6 h-6"/>
                        <div>
                            <h4 className="font-bold">Animações de fundo</h4>
                            <p className="text-sm text-muted-foreground">Escolha entre várias animações de fundo para personalizar a página.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Music className="text-primary flex-shrink-0 w-6 h-6"/>
                        <div>
                            <h4 className="font-bold">Música dedicada</h4>
                            <p className="text-sm text-muted-foreground">Dedique uma música especial. A música será reproduzida automaticamente na página.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Globe className="text-primary flex-shrink-0 w-6 h-6"/>
                        <div>
                            <h4 className="font-bold">Em todo lugar</h4>
                            <p className="text-sm text-muted-foreground">Crie sua página e compartilhe de qualquer lugar do mundo. Aceitamos pagamentos internacionais.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <QrCode className="text-primary flex-shrink-0 w-6 h-6"/>
                        <div>
                            <h4 className="font-bold">QR Code exclusivo</h4>
                            <p className="text-sm text-muted-foreground">Crie um QR Code exclusivo para sua página. O QR Code será gerado automaticamente.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Lock className="text-primary flex-shrink-0 w-6 h-6"/>
                        <div>
                            <h4 className="font-bold">URL personalizada</h4>
                            <p className="text-sm text-muted-foreground">Crie uma URL personalizada para sua página. A URL será gerada automaticamente.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                <Image src="https://placehold.co/600x700.png" alt="Exemplo de Recurso" width={600} height={700} className="rounded-lg shadow-lg" data-ai-hint="love letter"/>
            </div>
        </div>
      </section>

      {/* Themes Section */}
      <section id="temas" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Temas CodeLove</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">Escolha o tema ideal para a página personalizada. Você pode escolher entre os temas abaixo.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="p-0">
                         <Image src="https://placehold.co/500x300.png" alt="Tema Padrão" width={500} height={300} className="rounded-t-lg" data-ai-hint="hearts background"/>
                    </CardHeader>
                    <CardContent className="text-left pt-6">
                        <h3 className="font-bold text-xl mb-2">Padrão</h3>
                        <p className="text-muted-foreground">Tema padrão com contador de tempo e animações de fundo.</p>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button variant="outline" className="w-full">Experimentar agora</Button>
                        <Button className="w-full" asChild><Link href="/create">Criar página</Link></Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader className="p-0">
                         <Image src="https://placehold.co/500x300.png" alt="Tema Netflix" width={500} height={300} className="rounded-t-lg" data-ai-hint="movie streaming interface"/>
                    </CardHeader>
                    <CardContent className="text-left pt-6">
                        <h3 className="font-bold text-xl mb-2">Netflix</h3>
                        <p className="text-muted-foreground">Tema inspirado na Netflix com data e episódios(fotos) favoritos.</p>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button variant="outline" className="w-full">Experimentar agora</Button>
                        <Button className="w-full" asChild><Link href="/create">Criar página</Link></Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="avaliacoes" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">O que nossos clientes estão dizendo sobre a CodeLove</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">Avaliações de clientes que já utilizaram nossos serviços e tiveram uma experiência incrível.</p>
             <Carousel opts={{ align: "start", loop: true, }} className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                    {testimonials.concat(testimonials).map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="h-full flex flex-col">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint}/>
                                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-base text-left">{testimonial.name}</CardTitle>
                                            <CardDescription className="text-left">{testimonial.time}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-left text-muted-foreground">"{testimonial.text}"</p>
                                    </CardContent>
                                    <CardFooter>
                                       <StarRating rating={5} />
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex"/>
            </Carousel>
        </div>
      </section>

      {/* Plans Section */}
       <section id="planos" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Nossos Planos</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground mb-12">Escolha o plano ideal para sua página personalizada. Você pode escolher entre os planos abaixo.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
                    {/* Recommended Plan */}
                    <Card className="border-primary border-2 relative">
                        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full font-bold">Recomendado</div>
                        <CardHeader className="pt-8">
                            <CardTitle className="text-2xl font-bold">Para sempre</CardTitle>
                            <CardDescription>Esse plano é vitalício, não precisa renovar.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-left">
                            <ul className="space-y-2 text-sm text-muted-foreground">
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
                        <CardFooter className="flex flex-col pt-0">
                            <p className="text-muted-foreground"><span className="line-through">R$ 54,00</span></p>
                            <p className="text-3xl font-bold my-2">R$ 27,00 <span className="text-sm font-normal text-muted-foreground">/uma vez</span></p>
                            <Button className="w-full" asChild><Link href="/create">Criar minha página</Link></Button>
                        </CardFooter>
                    </Card>

                    {/* Annual Plan */}
                    <Card>
                         <CardHeader>
                            <CardTitle className="text-2xl font-bold">Anual</CardTitle>
                            <CardDescription>Esse plano possui um período de 1 ano.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-left">
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Texto dedicado</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Contador em tempo real</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Data de início</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>QR Code exclusivo</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Máximo de 4 imagens</li>
                                <li className="flex items-center text-gray-400 line-through"><CheckCircle className="text-gray-400 mr-2" size={16}/>Sem música</li>
                                <li className="flex items-center text-gray-400 line-through"><CheckCircle className="text-gray-400 mr-2" size={16}/>Sem fundo dinâmico</li>
                                <li className="flex items-center text-gray-400 line-through"><CheckCircle className="text-gray-400 mr-2" size={16}/>Sem animações exclusivas</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>URL personalizada</li>
                                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Suporte 24 horas</li>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex flex-col pt-0">
                            <p className="text-muted-foreground"><span className="line-through">R$ 34,00</span></p>
                            <p className="text-3xl font-bold my-2">R$ 17,00 <span className="text-sm font-normal text-muted-foreground">/por ano</span></p>
                            <Button className="w-full" asChild><Link href="/create">Criar minha página</Link></Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
       </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Perguntas Frequentes</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12">Aqui estão algumas perguntas frequentes para ajudar você a entender melhor a CodeLove. Caso tenha alguma dúvida, entre em contato conosco.</p>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto text-left">
                {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index+1}`} key={index}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>
                           {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
             <p className="mt-8 text-muted-foreground">Dúvidas? <a href="#" className="text-primary underline">Entre em contato por aqui</a></p>
        </div>
      </section>

      {/* Final CTA */}
        <section className="bg-primary/10">
            <div className="container mx-auto px-4 py-16 md:py-24 text-center">
                <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Declare seu amor<br/>de forma única</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-8">
                Crie uma página personalizada para quem você ama e surpreenda a pessoa com uma declaração especial que ficará para sempre.
                </p>
                <Button size="lg" asChild><Link href="/create">Criar minha página</Link></Button>
                <div className="mt-8 flex justify-center items-center gap-4">
                    <div className="flex -space-x-2">
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 1" data-ai-hint="couple"/>
                            <AvatarFallback>C1</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 2" data-ai-hint="couple"/>
                            <AvatarFallback>C2</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 3" data-ai-hint="couple"/>
                            <AvatarFallback>C3</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 4" data-ai-hint="couple"/>
                            <AvatarFallback>C4</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Casal 5" data-ai-hint="couple"/>
                            <AvatarFallback>C5</AvatarFallback>
                        </Avatar>
                    </div>
                    <p className="text-sm text-muted-foreground">Mais de <strong>40.325</strong> usuários satisfeitos</p>
                </div>
            </div>
        </section>

      {/* Footer */}
      <footer className="bg-secondary/30">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <Logo/>
                     <p className="max-w-xs mt-2 text-sm text-muted-foreground">A CodeLove é uma plataforma que permite criar páginas personalizadas para pessoas especiais.</p>
                </div>
                 <div className="flex gap-8">
                    <div className="flex flex-col gap-2 text-sm">
                        <a href="#" className="hover:text-primary">Termos de uso</a>
                        <a href="#" className="hover:text-primary">Política de privacidade</a>
                    </div>
                     <div className="flex flex-col gap-2 text-sm">
                         <a href="#" className="hover:text-primary">Instagram</a>
                         <a href="#" className="hover:text-primary">TikTok</a>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs text-muted-foreground mt-8 pt-8 border-t border-border">
                Copyright © 2025 - CodeLove.com
            </div>
        </div>
      </footer>
    </div>
  );
}
