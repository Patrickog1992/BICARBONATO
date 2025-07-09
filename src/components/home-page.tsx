'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, CheckCircle, Star, Heart, Calendar, Music, Globe, QrCode, Lock, Menu, Languages, UserCircle, Rocket, Sparkles } from 'lucide-react';

import { Logo } from '@/components/logo';

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
  ];
  
  const faqItems = [
    { question: "O que é a CodeLove?", answer: "CodeLove é uma plataforma que permite criar páginas personalizadas para pessoas especiais, transformando suas memórias em uma declaração de amor digital e eterna." },
    { question: "Como posso criar uma página personalizada na CodeLove?", answer: "É muito simples! Basta clicar em 'Criar minha página', personalizar sua página com textos e músicas, e você receberá o link para compartilhar com seu amor." },
    { question: "O que está incluído na minha página personalizada?", answer: "Sua página inclui uma mensagem de amor personalizada e pode ter uma música de fundo do YouTube. Em breve, você também poderá adicionar fotos e muito mais!" },
    { question: "Como recebo minha página personalizada após o pagamento?", answer: "Após a confirmação do pagamento, você receberá um e-mail com o link de acesso e o QR Code da sua página personalizada." },
    { question: "A página personalizada tem validade?", answer: "Oferecemos dois planos. O plano 'Para Sempre' é vitalício e não expira. O plano 'Anual' tem validade de um ano, podendo ser renovado." },
    { question: "Quais são as formas de pagamento aceitas?", answer: "Aceitamos as principais formas de pagamento, incluindo cartão de crédito, débito e Pix. Também processamos pagamentos internacionais." },
  ];

  return (
    <div className="bg-black text-white">
      <div className="bg-gradient-to-r from-primary via-rose-800 to-pink-500 text-white text-center p-2 text-sm font-medium">
        ✨ Apenas hoje 09/07/2025 - Todos os planos com 50% de desconto, aproveite!
      </div>
      
      <header className="container mx-auto px-4 py-4 flex justify-between items-center relative z-50 gap-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <a href="#inicio" className="hover:text-white">Início</a>
          <a href="#como-funciona" className="hover:text-white">Como funciona?</a>
          <a href="#temas" className="hover:text-white">Temas</a>
          <a href="#planos" className="hover:text-white">Planos</a>
          <a href="#faq" className="hover:text-white">F.A.Q</a>
        </nav>
        <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-black/20 border-neutral-700 hover:bg-neutral-800"><UserCircle className="mr-2 h-4 w-4"/>Minha conta</Button>
        </div>
        <div className="md:hidden">
            <Button variant="ghost" size="icon"><Menu /></Button>
        </div>
      </header>
      
      <main>
        <section id="inicio" className="bg-black bg-grid-neutral-800/20 relative">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-32 pb-20">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
                  Declare seu amor<br/>para seu amor!
                </h1>
                <p className="max-w-xl mx-auto lg:mx-0 text-neutral-300 text-lg mb-8">
                  Crie uma página personalizada para quem você ama e surpreenda a pessoa com uma declaração especial que ficará para sempre.
                </p>
                <div className="flex justify-center lg:justify-start">
                    <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-lg px-8 py-6" asChild>
                        <Link href="/create"><Heart className="mr-2"/>Criar minha página</Link>
                    </Button>
                </div>
                <div className="mt-8 flex justify-center lg:justify-start items-center gap-4">
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
                    </div>
                    <p className="text-sm text-neutral-400">Mais de <strong>40.325</strong> usuários satisfeitos</p>
                </div>
              </div>

              <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
                <div className="relative mx-auto border-neutral-800 bg-neutral-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl animate-float">
                    <div className="w-[120px] h-[18px] bg-neutral-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                    <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[150px] rounded-s-lg"></div>
                    <div className="h-[54px] w-[3px] bg-neutral-800 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
                        <Image src="https://i.imgur.com/pGyjq58.png" className="w-full h-full object-cover" alt="App preview in a phone" width={270} height={550} data-ai-hint="love letter" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-24 bg-gradient-to-b from-black via-neutral-950 to-black relative">
          <div className="absolute inset-0 bg-grid-small-white/[0.05]"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona?</h2>
            <p className="max-w-2xl mx-auto text-neutral-300 mb-12">Crie sua página em poucos passos. O processo é simples e rápido.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: 'Personalize', description: 'Personalize sua página com fotos, mensagens, efeitos especiais e muito mais.' },
                { title: 'Faça o pagamento', description: 'Escolha seu plano preferido e faça o pagamento de forma rápida e segura.' },
                { title: 'Receba seu acesso', description: 'Você receberá por email um QR code e link para acessar sua página.' },
                { title: 'Compartilhe o amor', description: 'Compartilhe a página com a pessoa amada e surpreenda-a de forma especial.' }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">{index + 1}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-neutral-400 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <p className="text-primary font-bold mb-2">Vários Recursos</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Recursos Exclusivos</h2>
                <p className="text-neutral-300 mb-8">Nossa plataforma oferece recursos incríveis para você criar a página personalizada perfeita</p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3"><Calendar className="text-primary flex-shrink-0 w-6 h-6"/><div><h4 className="font-bold">Contador de tempo</h4><p className="text-sm text-neutral-400">Mostre há quanto tempo vocês estão juntos.</p></div></div>
                    <div className="flex items-start gap-3"><Sparkles className="text-primary flex-shrink-0 w-6 h-6"/><div><h4 className="font-bold">Animações de fundo</h4><p className="text-sm text-neutral-400">Escolha entre várias animações de fundo.</p></div></div>
                    <div className="flex items-start gap-3"><Music className="text-primary flex-shrink-0 w-6 h-6"/><div><h4 className="font-bold">Música dedicada</h4><p className="text-sm text-neutral-400">Adicione uma música especial do YouTube.</p></div></div>
                    <div className="flex items-start gap-3"><Globe className="text-primary flex-shrink-0 w-6 h-6"/><div><h4 className="font-bold">Em todo lugar</h4><p className="text-sm text-neutral-400">Crie sua página de qualquer lugar do mundo.</p></div></div>
                    <div className="flex items-start gap-3"><QrCode className="text-primary flex-shrink-0 w-6 h-6"/><div><h4 className="font-bold">QR Code exclusivo</h4><p className="text-sm text-neutral-400">Gere um QR Code exclusivo para sua página.</p></div></div>
                    <div className="flex items-start gap-3"><Lock className="text-primary flex-shrink-0 w-6 h-6"/><div><h4 className="font-bold">URL personalizada</h4><p className="text-sm text-neutral-400">Crie uma URL personalizada para sua página.</p></div></div>
                </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <div className="relative mx-auto border-neutral-800 bg-neutral-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl shadow-red-900/20">
                  <div className="w-[120px] h-[18px] bg-neutral-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                  <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                  <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[150px] rounded-s-lg"></div>
                  <div className="h-[54px] w-[3px] bg-neutral-800 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
                      <Image src="https://placehold.co/270x550.png" className="w-full h-full object-cover" alt="Exemplo de Recurso" width={270} height={550} data-ai-hint="love letter" />
                  </div>
              </div>
            </div>
        </div>
      </section>

      <section id="temas" className="py-24 bg-neutral-950">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Temas CodeLove</h2>
            <p className="max-w-2xl mx-auto text-neutral-300 mb-12">Escolha o tema ideal para a página personalizada.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative mx-auto border-neutral-800 bg-neutral-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl hover:scale-105 transition-transform duration-300">
                      <div className="w-[120px] h-[18px] bg-neutral-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[150px] rounded-s-lg"></div>
                      <div className="h-[54px] w-[3px] bg-neutral-800 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
                          <Image src="https://placehold.co/270x550.png" className="w-full h-full object-cover" alt="Tema Padrão" width={270} height={550} data-ai-hint="hearts background" />
                      </div>
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="font-bold text-xl mb-2">Padrão</h3>
                    <p className="text-neutral-400 max-w-xs">Tema padrão com contador de tempo e animações de fundo.</p>
                    <div className="flex gap-4 mt-4">
                      <Button variant="outline" className="w-full">Experimentar agora</Button>
                      <Button className="w-full" asChild><Link href="/create">Criar página</Link></Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative mx-auto border-neutral-800 bg-neutral-900 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl hover:scale-105 transition-transform duration-300">
                      <div className="w-[120px] h-[18px] bg-neutral-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[100px] rounded-s-lg"></div>
                      <div className="h-[40px] w-[3px] bg-neutral-800 absolute -start-[11px] top-[150px] rounded-s-lg"></div>
                      <div className="h-[54px] w-[3px] bg-neutral-800 absolute -end-[11px] top-[120px] rounded-e-lg"></div>
                      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black">
                          <Image src="https://placehold.co/270x550.png" className="w-full h-full object-cover" alt="Tema Netflix" width={270} height={550} data-ai-hint="movie streaming interface" />
                      </div>
                  </div>
                   <div className="text-center mt-2">
                      <h3 className="font-bold text-xl mb-2">Netflix</h3>
                      <p className="text-neutral-400 max-w-xs">Tema inspirado na Netflix com data e episódios(fotos) favoritos.</p>
                      <div className="flex gap-4 mt-4">
                        <Button variant="outline" className="w-full">Experimentar agora</Button>
                        <Button className="w-full" asChild><Link href="/create">Criar página</Link></Button>
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </section>
      
      <section id="avaliacoes" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos clientes estão dizendo</h2>
          <p className="max-w-2xl mx-auto text-neutral-300 mb-12">Avaliações de clientes que já utilizaram nossos serviços.</p>
        </div>
        <div className="scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]" style={{ "--animation-duration": "80s" } as React.CSSProperties}>
          <ul className="flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <li key={index} className="w-[350px] max-w-full relative rounded-2xl border border-neutral-800 bg-neutral-900/80 flex-shrink-0 px-8 py-6 md:w-[450px]">
                <blockquote>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint}/>
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div><p className="text-base text-left font-bold">{testimonial.name}</p><p className="text-sm text-left text-neutral-400">{testimonial.time}</p></div>
                  </div>
                  <span className="relative z-20 text-sm leading-[1.6] text-neutral-300 font-normal">"{testimonial.text}"</span>
                  <div className="mt-4"><StarRating rating={5} /></div>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="planos" className="py-24 bg-neutral-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Planos</h2>
          <p className="max-w-2xl mx-auto text-neutral-300 mb-12">Escolha o plano ideal para sua página personalizada.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
            <Card className="border-primary border-2 relative bg-neutral-900">
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full font-bold">Recomendado</div>
              <CardHeader className="pt-8"><CardTitle className="text-2xl font-bold">Para sempre</CardTitle><CardDescription>Esse plano é vitalício, não precisa renovar.</CardDescription></CardHeader>
              <CardContent className="space-y-4 text-left"><ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Texto dedicado</li>
                  <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Contador em tempo real</li>
                  <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Máximo de 8 imagens</li>
                  <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Com música</li>
                  <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Fundo dinâmico</li>
              </ul></CardContent>
              <CardFooter className="flex flex-col items-start pt-4"><p className="text-neutral-400"><span className="line-through">R$ 54,00</span></p><p className="text-3xl font-bold my-2">R$ 27,00 <span className="text-sm font-normal text-neutral-400">/uma vez</span></p><Button className="w-full mt-2" asChild><Link href="/create">Criar minha página</Link></Button></CardFooter>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader><CardTitle className="text-2xl font-bold">Anual</CardTitle><CardDescription>Esse plano possui um período de 1 ano.</CardDescription></CardHeader>
                <CardContent className="space-y-4 text-left"><ul className="space-y-2 text-sm text-neutral-300">
                    <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Texto dedicado</li>
                    <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Contador em tempo real</li>
                    <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16}/>Máximo de 4 imagens</li>
                    <li className="flex items-center text-neutral-500 line-through"><CheckCircle className="text-neutral-600 mr-2" size={16}/>Sem música</li>
                    <li className="flex items-center text-neutral-500 line-through"><CheckCircle className="text-neutral-600 mr-2" size={16}/>Sem fundo dinâmico</li>
                </ul></CardContent>
                <CardFooter className="flex flex-col items-start pt-4"><p className="text-neutral-400"><span className="line-through">R$ 34,00</span></p><p className="text-3xl font-bold my-2">R$ 17,00 <span className="text-sm font-normal text-neutral-400">/por ano</span></p><Button className="w-full mt-2" asChild><Link href="/create">Criar minha página</Link></Button></CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="max-w-2xl mx-auto text-neutral-300 mb-12">Aqui estão algumas perguntas frequentes para te ajudar.</p>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto text-left">
                {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index+1}`} key={index} className="border-neutral-800">
                        <AccordionTrigger className="hover:no-underline">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-neutral-300">{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
             <p className="mt-8 text-neutral-400">Dúvidas? <a href="#" className="text-primary underline">Entre em contato</a></p>
        </div>
      </section>

      <footer className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left"><Logo/><p className="max-w-xs mt-2 text-sm text-neutral-400">A CodeLove é uma plataforma que permite criar páginas personalizadas para pessoas especiais.</p></div>
                 <div className="flex gap-8 text-sm"><div className="flex flex-col gap-2"><a href="#" className="hover:text-primary">Termos de uso</a><a href="#" className="hover:text-primary">Política de privacidade</a></div><div className="flex flex-col gap-2"><a href="#" className="hover:text-primary">Instagram</a><a href="#" className="hover:text-primary">TikTok</a></div></div>
            </div>
            <div className="text-center text-xs text-neutral-500 mt-8 pt-8 border-t border-neutral-800">Copyright © 2025 - CodeLove.com</div>
        </div>
      </footer>
    </main>
    </div>
  );
}
