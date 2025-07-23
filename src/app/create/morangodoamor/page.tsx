
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { CheckCircle, ShieldCheck, Sparkles, Star, Tag, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function MorangoDoAmorLandingPage() {
  const checkoutUrl = 'https://checkout.kirvano.com/';

  const testimonials = [
    { name: "Maria de Fátima, RJ", text: "Vendi mais de 200 morangos em menos de uma semana!", rating: 5 },
    { name: "Jéssica L., SP", text: "A receita é fácil, o brilho é surreal. Todo mundo pergunta como fiz!", rating: 5 },
  ];
  
  const faqItems = [
    { question: "Eu preciso de curso de confeitaria para fazer?", answer: "Não! Essa receita é simples, com ingredientes fáceis e qualquer pessoa consegue fazer." },
    { question: "Como recebo o acesso?", answer: "Você receberá acesso imediato à receita completa por e-mail após a confirmação do pagamento." },
    { question: "Posso revender o doce?", answer: "Sim! Essa receita é ideal para gerar renda extra vendendo, seja para amigos, em feiras ou por encomenda." },
  ];

  const carouselItems = [
    {
      title: "Morango do Amor",
      image: "https://placehold.co/600x400.png",
      hint: "strawberry chocolate"
    },
    {
      title: "Morango do Amor Pistache",
      image: "https://placehold.co/600x400.png",
      hint: "strawberry pistachio"
    }
  ]

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-300'}`} />
      ))}
    </div>
  );

  return (
    <div className="bg-green-50 dark:bg-green-950 text-red-700 dark:text-red-300 font-sans">
      <main className="w-full">
        {/* Hero Section */}
        <section className="bg-green-100 dark:bg-green-900 text-center py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-4 inline-block bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 text-sm font-semibold px-4 py-1 rounded-full">
              Receita Original
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-700 dark:text-red-400 uppercase">
              A Receita Mais Desejada do Brasil Está Aqui!
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-red-600 dark:text-red-400 mb-6">
              Aprenda a criar o morango do amor — o doce com brilho de vidro que conquistou a internet e está gerando renda extra para milhares de pessoas!
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
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-8 py-7 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <ShoppingCart className="mr-2"/> Quero a Receita Agora!
              </Button>
            </a>
          </div>
        </section>

        {/* Why Everyone Wants This */}
        <section className="py-20 px-4 bg-green-50 dark:bg-green-950">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Por que Todo Mundo Quer Esse Morango?</h2>
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
                        <Image 
                            src={item.image}
                            alt={item.title}
                            width={500} 
                            height={300} 
                            className="rounded-2xl shadow-2xl"
                            data-ai-hint={item.hint}
                        />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-green-50 dark:bg-green-800 border-red-200 dark:border-red-900 p-6 text-left">
                            <CardContent className="p-0">
                                <StarRating rating={testimonial.rating} />
                                <p className="mt-4 text-lg italic">“{testimonial.text}”</p>
                                <p className="mt-4 font-bold">— {testimonial.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Urgency Section */}
        <section className="py-20 px-4 text-center bg-white dark:bg-black">
          <div className="container mx-auto max-w-4xl">
            <div className="border-2 border-dashed border-red-500 bg-red-50 dark:bg-red-900/20 text-center p-8 rounded-2xl">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">🚨 PROMOÇÃO POR TEMPO LIMITADO!</h2>
                <div className="text-2xl font-semibold text-red-500 dark:text-red-400">
                  De <span className="line-through">R$37,00</span> por apenas
                </div>
                <div className="text-5xl font-bold text-red-600 dark:text-red-500">
                  R$19,90!
                </div>
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold px-8 py-7 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 mt-4">
                    <ShoppingCart className="mr-2"/> Quero a Receita Agora!
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 text-center bg-green-100 dark:bg-green-900">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronta para encantar e lucrar com o doce mais viral do momento?</h2>
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold px-10 py-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                Sim, quero aprender agora!
              </Button>
            </a>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-red-600 dark:text-red-400">
              <ShieldCheck className="w-4 h-4"/>
              <span>Compra 100% segura com garantia</span>
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
