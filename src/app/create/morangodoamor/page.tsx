
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { CheckCircle, ShieldCheck, Sparkles, Star, Tag, ShoppingCart, Heart, ThumbsUp } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Autoplay from "embla-carousel-autoplay"


const SalesPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [sale, setSale] = useState({ name: '', location: '' });

  const salesData = [
    { name: "Ana P.", location: "Belo Horizonte, MG" },
    { name: "João V.", location: "Rio de Janeiro, RJ" },
    { name: "Carla S.", location: "Salvador, BA" },
    { name: "Mariana F.", location: "São Paulo, SP" },
    { name: "Pedro L.", location: "Curitiba, PR" },
  ];

  useEffect(() => {
    const showRandomPopup = () => {
      const randomSale = salesData[Math.floor(Math.random() * salesData.length)];
      setSale(randomSale);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Popup stays visible for 5 seconds
    };

    const interval = setInterval(() => {
      showRandomPopup();
    }, 8000); // New popup appears every 8 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in-up">
      <div className="bg-red-600 text-white rounded-lg p-3 shadow-lg max-w-xs">
        <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
                <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">{sale.name} de {sale.location}</p>
              <p className="text-xs">acabou de comprar a receita!</p>
            </div>
        </div>
      </div>
    </div>
  );
};


export default function MorangoDoAmorLandingPage() {
  const checkoutUrl = 'https://pay.kirvano.com/986afe47-563a-4c8c-8434-547f6ade0dbd';
  const [currentDate, setCurrentDate] = useState('');
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [likes, setLikes] = useState<number[]>([]);
  const [hearts, setHearts] = useState<number[]>([]);

  const testimonials = [
    { name: "Maria de Fátima, RJ", text: "Vendi mais de 200 morangos em menos de uma semana! A receita é um sucesso absoluto.", rating: 5, image: "https://i.imgur.com/kKzKmA0.png" },
    { name: "Jéssica L., SP", text: "A receita é fácil, o brilho é surreal. Todo mundo pergunta como fiz!", rating: 5, image: "https://i.imgur.com/VhoVk3r.png" },
    { name: "Ana P., MG", text: "Nunca pensei que conseguiria fazer um doce tão lindo. Minha família amou!", rating: 5, image: "https://i.imgur.com/GtzSNiz.jpeg" },
    { name: "Carlos S., BA", text: "Fiz para uma festa e foi o maior sucesso. A calda ficou perfeita, crocante e brilhante.", rating: 5, image: "https://i.imgur.com/Fo0ktY8.jpeg" },
    { name: "Beatriz M., RS", text: "Comecei a vender e já estou com a agenda cheia! O lucro é ótimo e a receita é muito prática.", rating: 5, image: "https://i.imgur.com/thS9xwe.jpeg" },
    { name: "Ricardo F., CE", text: "Simplesmente a melhor receita que já testei. O passo a passo é muito claro e não tem erro.", rating: 5, image: "https://i.imgur.com/SVV6zrv.png" },
  ];
  
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }));
    
    // Generate random numbers for likes and hearts on the client side to avoid hydration mismatch
    setLikes(testimonials.map(() => Math.floor(Math.random() * 200) + 20));
    setHearts(testimonials.map(() => Math.floor(Math.random() * 80) + 10));

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

  }, []); // Empty dependency array ensures this runs only once on the client after mount

  
  const faqItems = [
    { question: "Eu preciso de curso de confeitaria para fazer?", answer: "Não! Essa receita é simples, com ingredientes fáceis e qualquer pessoa consegue fazer." },
    { question: "Como recebo o acesso?", answer: "Você receberá acesso imediato à receita completa por e-mail após a confirmação do pagamento." },
    { question: "Posso revender o doce?", answer: "Sim! Essa receita é ideal para gerar renda extra vendendo, seja para amigos, em feiras ou por encomenda." },
  ];

  const carouselItems = [
    {
      title: "Morango do Amor",
      images: [
        { src: "https://i.imgur.com/51TfRvQ.jpeg", hint: "strawberry chocolate" },
        { src: "https://i.imgur.com/mBU4YdP.jpeg", hint: "strawberry chocolate glaze" },
        { src: "https://i.imgur.com/mwkmztE.jpeg", hint: "strawberry candy" },
      ]
    },
    {
      title: "Morango do Amor Pistache",
      images: [
        { src: "https://i.imgur.com/yd9axSu.jpeg", hint: "strawberry pistachio" },
        { src: "https://i.imgur.com/px24kLU.jpeg", hint: "strawberry pistachio candy" },
      ]
    }
  ]
  
  const HeartRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5 text-red-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Heart key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-red-200'}`} />
      ))}
    </div>
  );

  return (
    <div className="bg-green-50 dark:bg-green-950 text-red-700 dark:text-red-300 font-sans overflow-x-hidden">
      <SalesPopup />
      {currentDate && (
        <div className="bg-red-600 text-white text-center p-2 text-sm font-bold animate-in fade-in">
          SOMENTE HOJE ({currentDate}) ESSA PROMOÇÃO ESTÁ VÁLIDA
        </div>
      )}
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-green-100 dark:bg-green-900 text-center py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-4 inline-block bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 text-sm font-semibold px-4 py-1 rounded-full">
              Receita Original
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-600 dark:text-red-600 uppercase">
              A RECEITA MAIS DESEJADA DO BRASIL ESTÁ AQUI!
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-red-600 dark:text-red-400 mb-6 font-bold">
              Aprenda a criar o morango do amor gourmet o doce com brilho de vidro que conquistou a internet e está gerando renda extra para milhares de pessoas!
            </p>
            <div className="flex justify-center items-center mb-8">
              <Image 
                src="https://i.imgur.com/KgS9usy.png" 
                alt="Morango do Amor" 
                width={600} 
                height={400} 
                className="rounded-2xl shadow-2xl shadow-red-200/50 dark:shadow-red-900/50"
                data-ai-hint="strawberry chocolate"
                priority
              />
            </div>
            <a href="#oferta">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-8 py-7 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse-strong">
                <ShoppingCart className="mr-2"/> Quero a Receita Agora!
              </Button>
            </a>
          </div>
        </section>

        {/* Why Everyone Wants This */}
        <section className="py-20 px-4 bg-green-50 dark:bg-green-950">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Por que todo mundo quer esse morango?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Sparkles className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Brilho Hipnotizante</h3>
                <p className="text-red-600 dark:text-red-400">Uma calda de vidro perfeita que não derrete e encanta a todos.</p>
              </div>
              <div className="flex flex-col items-center">
                <Tag className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Ingredientes Acessíveis</h3>
                <p className="text-red-600 dark:text-red-400">Você encontra tudo o que precisa em qualquer supermercado.</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Perfeito para Vender</h3>
                <p className="text-red-600 dark:text-red-400">Uma oportunidade de negócio deliciosa e com alto lucro.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Video Section */}
        <section className="py-12 px-4 bg-green-50 dark:bg-green-950">
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">VEJA O VÍDEO</h2>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-red-200/50 dark:shadow-red-900/50">
                    <iframe 
                        src="https://www.youtube.com/embed/fY_KXefVtNo" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </section>


        {/* Recipe Photo Section */}
        <section className="py-20 px-4 bg-green-100 dark:bg-green-900">
          <div className="container mx-auto max-w-5xl text-center">
             <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Essa é a aparência do Morango do Amor que você vai aprender a fazer!
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {carouselItems.map((item, index) => (
                  <div key={index} className="p-1">
                    <Card className='bg-green-50 dark:bg-green-800 border-red-200 dark:border-red-900'>
                      <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                        <Carousel className="w-full max-w-xs">
                          <CarouselContent>
                            {item.images.map((image, imgIndex) => (
                              <CarouselItem key={imgIndex}>
                                <Image
                                  src={image.src}
                                  alt={`${item.title} - Imagem ${imgIndex + 1}`}
                                  width={500}
                                  height={300}
                                  className="rounded-2xl shadow-2xl object-cover aspect-[4/3]"
                                  data-ai-hint={image.hint}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                        <h3 className='text-2xl font-bold'>{item.title}</h3>
                      </CardContent>
                    </Card>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-green-50 dark:bg-green-950">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">O que você garante com a receita:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-xl mx-auto">
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Receita testada e <strong>aprovada</strong>!</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Acesso <strong>vitalício</strong> ao conteúdo</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Serve para festas, casamentos ou vendas</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Não precisa de utensílios caros</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Receita pronta em <strong>minutos</strong>!</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Suporte para tirar dúvidas</span></div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-green-100 dark:bg-green-900">
            <div className="container mx-auto max-w-5xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Quem já fez, aprova!</h2>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[autoplayPlugin.current]}
                  onMouseEnter={() => autoplayPlugin.current.stop()}
                  onMouseLeave={() => autoplayPlugin.current.play()}
                  className="w-full"
                >
                  <CarouselContent>
                      {testimonials.map((testimonial, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1 h-full">
                                  <Card className="bg-white text-gray-800 p-6 text-left flex flex-col h-full">
                                      <CardContent className="p-0 flex-grow">
                                          <div className="flex items-center mb-4">
                                            <Avatar>
                                                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4">
                                              <p className="font-bold text-red-800">{testimonial.name}</p>
                                              <HeartRating rating={testimonial.rating} />
                                            </div>
                                          </div>
                                          <p className="text-lg italic text-red-700">“{testimonial.text}”</p>
                                      </CardContent>
                                      <div className="flex items-center gap-4 mt-4 text-red-500">
                                         <div className="flex items-center gap-1">
                                             <ThumbsUp className="w-5 h-5"/>
                                             <span className="text-sm font-semibold">{likes[index] ?? '...'}</span>
                                         </div>
                                          <div className="flex items-center gap-1">
                                             <Heart className="w-5 h-5"/>
                                             <span className="text-sm font-semibold">{hearts[index] ?? '...'}</span>
                                         </div>
                                      </div>
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
        
        {/* Final CTA / Urgency Section */}
        <section id="oferta" className="py-20 px-4 text-center bg-green-50 dark:bg-green-950">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-red-600 dark:text-red-400">Pronta para encantar e lucrar com o doce mais viral do momento?</h2>
            <Card className="relative overflow-hidden border-2 border-red-500 bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl max-w-md mx-auto mb-8 shadow-2xl">
                <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")".replace('🍓', '%F0%9F%8D%93')}}></div>
                <CardContent className="relative p-0 flex flex-col items-center gap-4">
                    <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Acesso Imediato a Tudo Isso:</h3>
                    <ul className="text-left space-y-2 my-4 text-red-700 dark:text-red-300">
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Passo a passo <strong>à prova de erros</strong></span></li>
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Técnica do <strong>brilho de vidro</strong></span></li>
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Acesso <strong>vitalício e imediato</strong></span></li>
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Bônus: Guia de <strong>precificação</strong></span></li>
                    </ul>
                    <div className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg w-full">
                        <div className="text-md">De <span className="line-through">R$37,00</span> por apenas</div>
                        <div className="text-4xl">R$19,90!</div>
                    </div>
                </CardContent>
            </Card>
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-base sm:text-xl font-bold px-6 sm:px-10 py-5 sm:py-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse-strong">
                Sim, quero a receita completa agora!
              </Button>
            </a>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-red-600 dark:text-red-400">
              <ShieldCheck className="w-4 h-4"/>
              <span>Compra segura, aceitamos todas as bandeiras de cartão</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-green-50 dark:bg-green-950">
            <div className="container mx-auto max-w-3xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Perguntas Frequentes</h2>
                <Accordion type="single" collapsible className="w-full text-left">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index+1}`} key={index} className="bg-green-100 dark:bg-green-900 rounded-lg mb-4 px-6 border-b-0">
                            <AccordionTrigger className="hover:no-underline font-semibold text-lg">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-red-600 dark:text-red-400 pb-4">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        
        <footer className="bg-green-100 dark:bg-green-900 border-t border-red-100 dark:border-red-900">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-red-600 dark:text-red-400">
            <p>Copyright © 2024 - Morango do Amor. Todos os direitos reservados.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}

    