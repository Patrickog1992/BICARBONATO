
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { CheckCircle, ShieldCheck, Zap, Star, Tag, ShoppingCart, TestTube, BrainCircuit, HeartPulse } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Autoplay from "embla-carousel-autoplay"


export default function MoleculaBicarbonatoLandingPage() {
  const checkoutUrl = 'https://pay.kirvano.com/some-checkout-link';
  const [currentDate, setCurrentDate] = useState('');
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [likes, setLikes] = useState<number[]>([]);
  const [hearts, setHearts] = useState<number[]>([]);

  const testimonials = [
    { name: "Carlos A., São Paulo", text: "Minha disposição melhorou 100% em poucas semanas. O método é transformador!", rating: 5, image: "https://placehold.co/100x100.png", dataAiHint: "happy man" },
    { name: "Fernanda L., Rio de Janeiro", text: "Fácil de seguir e os resultados são visíveis. Recomendo para todos!", rating: 5, image: "https://placehold.co/100x100.png", dataAiHint: "smiling woman" },
    { name: "Juliano S., Minas Gerais", text: "Nunca imaginei que uma molécula tão simples pudesse fazer tanta diferença. Energia e foco renovados.", rating: 5, image: "https://placehold.co/100x100.png", dataAiHint: "man portrait" },
    { name: "Beatriz M., Rio Grande do Sul", text: "Comecei a aplicar e já sinto meu corpo mais equilibrado e saudável. É incrível!", rating: 5, image: "https://placehold.co/100x100.png", dataAiHint: "woman portrait" },
  ];
  
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }));
    
    setLikes(testimonials.map(() => Math.floor(Math.random() * 300) + 50));
    setHearts(testimonials.map(() => Math.floor(Math.random() * 150) + 20));

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

  }, []);

  
  const faqItems = [
    { question: "Preciso ter conhecimento em química ou biologia?", answer: "Não! O método é explicado de forma simples e didática, para que qualquer pessoa possa entender e aplicar." },
    { question: "Como recebo o acesso ao material?", answer: "O acesso é imediato. Após a confirmação do pagamento, você receberá um e-mail com todas as instruções para acessar o conteúdo." },
    { question: "Existem contraindicações?", answer: "O método é baseado em princípios naturais, mas sempre recomendamos consultar um profissional de saúde antes de iniciar qualquer novo protocolo." },
  ];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  return (
    <div className="bg-[#F0F7F4] dark:bg-[#0B1D1A] text-[#0A2E28] dark:text-[#C8E6DE] font-sans overflow-x-hidden">
      {currentDate && (
        <div className="bg-teal-600 text-white text-center p-2 text-sm font-bold animate-in fade-in">
          OFERTA ESPECIAL VÁLIDA SOMENTE HOJE ({currentDate})
        </div>
      )}
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-teal-50 dark:bg-teal-900/30 text-center py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-4 inline-block bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 text-sm font-semibold px-4 py-1 rounded-full">
              Ciência e Bem-Estar
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-teal-800 dark:text-teal-200 leading-tight">
              Descubra o Poder da Molécula de Bicarbonato
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-teal-700 dark:text-teal-300 mb-8">
              Aprenda o método inovador que está revolucionando a saúde e o bem-estar com uma solução simples, acessível e comprovada cientificamente.
            </p>
            <div className="flex justify-center items-center mb-10">
              <Image 
                src="https://placehold.co/1200x800.png" 
                alt="Molécula de Bicarbonato" 
                width={600} 
                height={400} 
                className="rounded-2xl shadow-2xl shadow-teal-200/50 dark:shadow-teal-900/50"
                data-ai-hint="molecule science"
                priority
              />
            </div>
            <a href="#oferta">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white text-lg font-bold px-10 py-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse-strong">
                <ShoppingCart className="mr-3 h-6 w-6"/> QUERO O MÉTODO AGORA
              </Button>
            </a>
          </div>
        </section>

        {/* Why this is important */}
        <section className="py-20 px-4 bg-[#F0F7F4] dark:bg-[#0B1D1A]">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-800 dark:text-teal-200">Por que essa molécula é revolucionária?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-teal-900/20 rounded-lg shadow-lg">
                <HeartPulse className="h-12 w-12 text-teal-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Equilíbrio do pH Corporal</h3>
                <p className="text-teal-700 dark:text-teal-300">Ajuda a neutralizar a acidez excessiva, fundamental para o funcionamento ideal do seu corpo.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white dark:bg-teal-900/20 rounded-lg shadow-lg">
                <Zap className="h-12 w-12 text-teal-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Aumento de Energia</h3>
                <p className="text-teal-700 dark:text-teal-300">Melhora a oxigenação das células, resultando em mais disposição e vitalidade no seu dia a dia.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white dark:bg-teal-900/20 rounded-lg shadow-lg">
                <BrainCircuit className="h-12 w-12 text-teal-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Clareza Mental</h3>
                <p className="text-teal-700 dark:text-teal-300">Contribui para a desintoxicação, o que pode levar a um aumento do foco e da performance cognitiva.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 px-4 bg-teal-50 dark:bg-teal-900/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-800 dark:text-teal-200">O que você conquista com o método:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-left max-w-xl mx-auto text-lg">
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Protocolo <strong>validado</strong> e seguro</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Acesso <strong>vitalício</strong> ao conteúdo</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Baseado em <strong>estudos científicos</strong></span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Ingredientes <strong>acessíveis</strong> e baratos</span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Resultados em <strong>poucas semanas</strong></span></div>
              <div className="flex items-center gap-3"><CheckCircle className="text-green-500 flex-shrink-0 w-6 h-6"/><span>Suporte exclusivo para tirar dúvidas</span></div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-[#F0F7F4] dark:bg-[#0B1D1A]">
            <div className="container mx-auto max-w-5xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-800 dark:text-teal-200">Quem já testou, comprova!</h2>
                <Carousel
                  opts={{ align: "start", loop: true, }}
                  plugins={[autoplayPlugin.current]}
                  onMouseEnter={() => autoplayPlugin.current.stop()}
                  onMouseLeave={() => autoplayPlugin.current.play()}
                  className="w-full"
                >
                  <CarouselContent>
                      {testimonials.map((testimonial, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-2 h-full">
                                  <Card className="bg-white dark:bg-teal-900/40 text-gray-800 dark:text-gray-200 p-6 text-left flex flex-col h-full shadow-lg">
                                      <CardContent className="p-0 flex-grow">
                                          <div className="flex items-center mb-4">
                                            <Avatar className="w-12 h-12 border-2 border-teal-400">
                                                <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                                                <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4">
                                              <p className="font-bold text-teal-800 dark:text-teal-200">{testimonial.name}</p>
                                              <StarRating rating={testimonial.rating} />
                                            </div>
                                          </div>
                                          <p className="text-lg italic text-teal-700 dark:text-teal-300">“{testimonial.text}”</p>
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
        
        {/* Final CTA / Urgency Section */}
        <section id="oferta" className="py-20 px-4 text-center bg-teal-50 dark:bg-teal-900/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-teal-800 dark:text-teal-200">Pronto para transformar sua saúde e bem-estar?</h2>
            <Card className="relative overflow-hidden border-2 border-teal-500 bg-white dark:bg-teal-900/20 p-8 rounded-2xl max-w-md mx-auto mb-8 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-teal-800 dark:text-teal-200">Acesso Completo ao Método</CardTitle>
                </CardHeader>
                <CardContent className="relative p-0 flex flex-col items-center gap-4">
                    <ul className="text-left space-y-2 my-4 text-teal-700 dark:text-teal-300">
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Passo a passo <strong>detalhado e ilustrado</strong></span></li>
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Explicação científica de <strong>forma simples</strong></span></li>
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Acesso <strong>vitalício e imediato</strong></span></li>
                        <li className="flex items-center gap-2"><CheckCircle className="text-green-500 w-5 h-5"/><span>Bônus: Guia de <strong>Alimentos Alcalinos</strong></span></li>
                    </ul>
                    <div className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg w-full text-center">
                        <div className="text-lg">De <span className="line-through">R$97,00</span> por apenas</div>
                        <div className="text-5xl font-bold">R$47,00</div>
                         <div className="text-md">ou 10x de R$5,34</div>
                    </div>
                </CardContent>
            </Card>
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white text-base sm:text-xl font-bold px-8 sm:px-12 py-6 sm:py-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse-strong">
                Sim, quero transformar minha saúde!
              </Button>
            </a>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-teal-600 dark:text-teal-400">
              <ShieldCheck className="w-4 h-4"/>
              <span>Compra 100% segura e garantia de 7 dias.</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-[#F0F7F4] dark:bg-[#0B1D1A]">
            <div className="container mx-auto max-w-3xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-teal-800 dark:text-teal-200">Perguntas Frequentes</h2>
                <Accordion type="single" collapsible className="w-full text-left">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index+1}`} key={index} className="bg-white dark:bg-teal-900/20 rounded-lg mb-4 px-6 border-b-0 shadow">
                            <AccordionTrigger className="hover:no-underline font-semibold text-lg text-teal-800 dark:text-teal-200">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-teal-700 dark:text-teal-300 pb-4 pt-2 text-base">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        
        <footer className="bg-teal-100 dark:bg-teal-900/30 border-t border-teal-200 dark:border-teal-800">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-teal-700 dark:text-teal-300">
            <p>Copyright © 2024 - Molécula Bicarbonato. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">Este produto não substitui o parecer médico profissional. Sempre consulte um médico para tratar de assuntos relativos à saúde.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}

    