
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Script from 'next/script';
import { Button } from '@/components/ui/button';

export default function VSLPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  const comments = [
    { name: "Eduardo Coelhor", text: "Ainda bem que eu vi o vídeo até o final. Fico feliz demais Muito obrigado Dr. por ter descoberto, fiz o teste e em dois dias já voltei duro, azulzinho nunca mais!.", likes: 38, image: "https://i.imgur.com/J4omSDG.jpeg" },
    { name: "Roberto Belmonte", text: "O negócio funciona moço", likes: 7, image: "https://i.imgur.com/Mgtjt2s.jpeg" },
    { name: "Pedro Paulo", text: "No início eu duvidava muito, até porque já tinha tentado de tudo antes Mas mesmo assim resolvi dar uma chance e fiquei impressionado!", likes: 219, image: "https://i.imgur.com/Uxfn3tt.jpeg" },
    { name: "Lucas Almeida", text: "Tava querendo saber se funcionava de verdade e agora vendo todos esses comentários positivos, já sei a resposta. Mto obg gente!!", likes: 24, image: "https://i.imgur.com/lUUhU1Y.jpeg" },
    { name: "Marcelo Santos Lima", text: "Estou surpreso como esse truque funciona mesmo! Duvidava que realmente ia funcionar, estou usando há 30 dias e voltei a fazer 2 vezes por dia, imagina quando fizer 3 meses de uso, minha mulher que me espere", likes: 14, image: "https://i.imgur.com/sn5RI1e.jpeg" },
    { name: "Guilherme Motta", text: "Eu realmente precisava desse truque para salvar meu casamento, nao sabia mais o que fazer. O vídeo demora um pouco, mas depois que é revelado o truque eu fiquei surpreso pq funciona de verdade!obrigado Doutor!", likes: 102, image: "https://i.imgur.com/E1w9zPj.jpeg" },
    { name: "Rodrigo Menezes", text: "Depois que completei 56 anos, comecei a sofrer com a disfunção, o que me fazia sempre ficar meia bomba, sem falar na minha libido que tava lá no chão… Agora, depois de usar sua solução, tudo isso acabou! Eu parei de passar vergonha. Realmente funciona, eu recomendo mto", likes: 23, image: "https://i.imgur.com/QfJtgio.jpeg" },
    { name: "Bruno Martins", text: "Você devia mostrar esse truque para todo mundo! Ele funciona mesmo!", likes: 5, image: "https://i.imgur.com/cGzrRGs.jpeg" },
    { name: "Emanuel Silva", text: "Eu sofria com ele ficando apenas meia bomba, não chegava a falhar, mas minha esposa notava que tinha algo errado, ela chegou a brigar comigo achando que eu tava traindo ela Mas era só que o menino não subia mesmo. Mas agora não tem quem me segure, virei adolescente de novo!", likes: 28, image: "https://i.imgur.com/om1IUWv.jpeg" },
    { name: "Wagner Moura", text: "Não consigo deixar ele rigido faz mais de 8 anos, será que funciona?", likes: 16, image: "https://i.imgur.com/iGAged5.png" },
    { name: "Celia Ivano", text: "Wagner o negócio fica igual concreto rsrs Esse metodo foi a única tentativa que deu certo pra mim. Pode testar, vc vai ver como funciona!", likes: 11, image: "https://i.imgur.com/d2jduEE.png" },
    { name: "Diego Silva", text: "Já fazia três anos que eu não conseguia levantar o mastro tentei de tudo gel massagem e nada funcionava. So esse metodo que conseguiu me salva só não use muito senão não tem quem faça descer o meninão!!", likes: 18, image: "https://i.imgur.com/fQsRwi9.png" },
    { name: "João paulo", text: "Valeu, vou testar também!", likes: 14, image: "https://i.imgur.com/vo1rj2z.png" },
    { name: "Otavio Neto", text: "Fazia tempo que estava procurando isso, sorte que achei de novo", likes: 5, image: "https://i.imgur.com/2LUcY7N.png" },
    { name: "Eduardo Machado", text: "Quero agradecer a Rogério, que me mostrou esse método e me deixou duro de um jeito que nunca fiquei na vida, me sinto até um adolescente novamente!", likes: 1, image: "https://i.imgur.com/XhmOQQF.png" },
    { name: "José Carvalho", text: "eu sofria com a mesma coisa que vocês Minha esposa já tava pra me deixar Esse truque do bicarbonato foi minha única tentativa que deu certo, você vai ver como funciona.", likes: 152, image: "https://i.imgur.com/hmBoEjU.png" },
    { name: "José Antônio", text: "No início eu não acreditei, mas os resultados falam por si. Lutando com a disfunção e noites mal sucedidas, o tratamento foi o único que me deu alívio", likes: 2, image: "https://i.imgur.com/Os3Y3YP.png" },
    { name: "Fernando Luiz Almeida", text: "Pagaria até um milhão por esse tratamento se soubesse que ia me fazer tão bem assim", likes: 1, image: "https://i.imgur.com/5fLYqMn.png" },
    { name: "Bento Silva", text: "Hoje eu finalmente parei de sofrer com aquela meia bomba e agora, eu não acordo mais envergonhado, mas sim com minha mulher querendo fogo!", likes: 56, image: "https://i.imgur.com/om1IUWv.jpeg" },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans">
      <div className="bg-red-600 text-white text-center p-2">
        <p className="font-bold animate-pulse">1423 Pessoas estão assistindo à esse vídeo.</p>
        <p>
          Devido a alta demanda de acessos, garantimos a apresentação somente até: <span className="font-bold">{currentDate}</span>
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                INCRÍVEL ! Ator da industria pornô revela :<br/>
                <span className="text-red-600">O ingrediente caseiro secreto</span> usado para <span className="text-red-600">aumentar em até 9 cm o tamanho do PÊNIS !</span>
            </h1>
        </div>

        <div id="vid_68ac96e7195a057df62e1153" style={{display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px'}}/>
        <Script 
          src="https://scripts.converteai.net/eaf579c8-6aa1-4f6f-b5bd-8ba46f9e23f8/players/68ac96e7195a057df62e1153/player.js" 
          strategy="afterInteractive" 
        />

        <div className="text-center my-8">
          <p className="text-blue-600 text-lg font-semibold">Por favor, verifique se o som está ligado.</p>
        </div>
        
        <div className="text-center my-10 animate-in fade-in duration-500">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-10 py-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform animate-pulse">
                <a href="#">QUERO O LORDE DAS EREÇÕES POR R$ 147,00</a>
            </Button>
        </div>

        <div className="my-12 flex justify-center">
            <Image src="https://i.imgur.com/pc0IljQ.png" alt="Selo de garantia" width={500} height={100} data-ai-hint="guarantee seal" />
        </div>


        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900">448 comentários</h2>
          <div className="border-t border-gray-200 mb-6"></div>
          <p className="text-gray-500 mb-6">Exibindo os 23 mais relevantes</p>

          <div className="space-y-6">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-3">
                 <Avatar>
                    <AvatarImage src={comment.image} alt={comment.name} />
                    <AvatarFallback>{comment.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-bold text-blue-600">{comment.name}</p>
                  <p className="text-gray-700">{comment.text}</p>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <ThumbsUp className="w-4 h-4 mr-1 text-blue-600" />
                    <Heart className="w-4 h-4 mr-1 text-red-600 fill-current" />
                    <span>{comment.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-500">
            <p>Entre na sua conta para comentar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
