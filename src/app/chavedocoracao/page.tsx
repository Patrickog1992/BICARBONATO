
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { Heart, Key, Star, ShieldCheck, Truck, Gift, ShoppingCart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function ChaveDoCoracaoPage() {
    const checkoutUrl = "https://pay.kirvano.com/dbe23b9f-7023-42b4-82a1-1254a64b38d3";

    const testimonials = [
        { name: "Juliana R.", text: "Dei de presente para o meu namorado e ele amou! O colar é ainda mais bonito pessoalmente. A caixinha com a mensagem é um toque muito especial. Super recomendo!", image: "https://i.imgur.com/kKzKmA0.png" },
        { name: "Marcos T.", text: "Comprei para minha esposa e ela ficou muito emocionada. A qualidade é excelente e a entrega foi super rápida. Virou o amuleto da sorte dela.", image: "https://i.imgur.com/SVV6zrv.png" },
        { name: "Fernanda L.", text: "Perfeito! Estava procurando um presente único e encontrei. O brilho do colar é incrível e o significado é lindo. Cinco estrelas!", image: "https://i.imgur.com/VhoVk3r.png" },
    ];

    const faqItems = [
        { question: "Qual é o material do colar?", answer: "O colar é feito de aço inoxidável de alta qualidade, banhado a ouro 18k, garantindo que não escureça, não enferruje e seja hipoalergênico." },
        { question: "O colar vem com a caixa da foto?", answer: "Sim! O colar acompanha uma caixa de presente exclusiva com a mensagem 'A Chave do Meu Coração', exatamente como mostrado nas imagens." },
        { question: "Qual o prazo de entrega?", answer: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização. Você receberá um código de rastreio para acompanhar seu pedido." },
        { question: "Tenho garantia?", answer: "Com certeza! Oferecemos uma garantia de 7 dias para devolução por qualquer motivo e 30 dias contra defeitos de fabricação." },
    ];

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex gap-0.5 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-400'}`} />
            ))}
        </div>
    );

    return (
        <div className="bg-[#1C1C1C] text-white font-sans">
            <style jsx global>{`
                .text-shadow-gold {
                    text-shadow: 0 2px 4px rgba(255, 215, 0, 0.3);
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2.5s infinite ease-in-out;
                }
                @keyframes pulse-slow {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 35px rgba(212, 175, 55, 0.7);
                    }
                }
            `}</style>
            
            <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 text-center">
                    <h2 className="text-xl font-bold text-[#D4AF37] tracking-widest">CHAVE DO CORAÇÃO</h2>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative text-center py-20 px-6 overflow-hidden bg-gradient-to-b from-[#1C1C1C] to-[#282828]">
                    <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                    <div className="container mx-auto max-w-3xl relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-shadow-gold text-white leading-tight">
                            A Chave que Abre o Coração do seu Amor
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
                            O presente perfeito para simbolizar sua conexão única. Um colar elegante que guarda o segredo do seu amor.
                        </p>
                        <div className="my-10">
                            <Image 
                                src="https://i.imgur.com/kS9l5gQ.png" 
                                alt="Colar Chave do Coração"
                                width={500} 
                                height={500} 
                                className="rounded-lg shadow-2xl mx-auto"
                                data-ai-hint="heart key necklace"
                                priority
                            />
                        </div>
                        <a href="#comprar">
                            <Button size="lg" className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-lg px-12 py-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-pulse-slow">
                                <ShoppingCart className="mr-3" /> EU QUERO ESSE PRESENTE
                            </Button>
                        </a>
                        <p className="mt-4 text-sm text-neutral-400">Últimas unidades com frete grátis!</p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 bg-[#282828]">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="grid md:grid-cols-3 gap-10 text-center">
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-black/30 rounded-full mb-4 border border-neutral-700">
                                    <Key className="h-10 w-10 text-[#D4AF37]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Design Exclusivo</h3>
                                <p className="text-neutral-400">Um coração com uma fechadura e uma chave, simbolizando um amor que se completa.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-black/30 rounded-full mb-4 border border-neutral-700">
                                    <Gift className="h-10 w-10 text-[#D4AF37]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Caixa de Presente Especial</h3>
                                <p className="text-neutral-400">Acompanha uma caixa luxuosa com uma mensagem emocionante, pronta para presentear.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-black/30 rounded-full mb-4 border border-neutral-700">
                                    <Heart className="h-10 w-10 text-[#D4AF37]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Material de Alta Qualidade</h3>
                                <p className="text-neutral-400">Feito em aço inoxidável banhado a ouro. Não escurece e não causa alergia.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24 bg-[#1C1C1C]">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">Quem comprou, se apaixonou</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="bg-[#282828] border-neutral-700 text-left">
                                    <CardContent className="p-6">
                                        <div className="flex items-center mb-4">
                                            <Avatar>
                                                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4">
                                                <p className="font-bold text-white">{testimonial.name}</p>
                                                <StarRating rating={5} />
                                            </div>
                                        </div>
                                        <p className="text-neutral-300 italic">"{testimonial.text}"</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* CTA Section */}
                <section id="comprar" className="py-24 bg-[#282828]">
                    <div className="container mx-auto px-6 max-w-3xl text-center">
                         <Card className="bg-black/50 border-2 border-[#D4AF37] p-8 rounded-2xl shadow-2xl shadow-[#D4AF37]/20">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold text-[#D4AF37] mb-2">OFERTA ESPECIAL</CardTitle>
                                <CardDescription className="text-neutral-300 text-lg">Surpreenda quem você ama com um presente inesquecível.</CardDescription>
                            </CardHeader>
                            <CardContent className="my-6">
                                <p className="text-5xl font-bold text-white">R$ 127,00</p>
                                <p className="text-neutral-400 line-through mt-2">De R$ 254,00</p>
                                <p className="text-green-400 font-semibold mt-2">50% de DESCONTO + Frete Grátis</p>
                            </CardContent>
                            <CardFooter className="flex-col gap-4">
                                <a href={checkoutUrl} className="w-full">
                                    <Button size="lg" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-lg px-10 py-7 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                                        COMPRAR AGORA
                                    </Button>
                                </a>
                                <div className="flex items-center gap-4 text-neutral-400 text-sm">
                                    <ShieldCheck className="w-5 h-5 text-green-500"/>
                                    <span>Compra Segura</span>
                                    <Truck className="w-5 h-5 text-green-500"/>
                                    <span>Entrega Rápida</span>
                                </div>
                            </CardFooter>
                         </Card>
                    </div>
                </section>
                
                {/* FAQ Section */}
                <section className="py-24 bg-[#1C1C1C]">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Perguntas Frequentes</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem value={`item-${index+1}`} key={index} className="border-neutral-800 bg-black/20 rounded-lg mb-3 px-4">
                                    <AccordionTrigger className="hover:no-underline text-lg font-semibold text-left text-white">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-neutral-300 text-base pb-4">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            </main>

            <footer className="bg-black text-neutral-400 text-sm">
                <div className="container mx-auto px-6 py-8 text-center">
                    <p>Copyright © 2024 - Chave do Coração. Todos os direitos reservados.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <Link href="#" className="hover:text-white">Termos de Uso</Link>
                        <Link href="#" className="hover:text-white">Política de Privacidade</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
