
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function VSLChaveDoCoracaoPage() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);

    const comments = [
        { name: "Juliana R.", text: "Fiz a corrente com muita fé e em 5 dias ele me procurou! Não acreditei, estava desesperada. Obrigada!", likes: 138, image: "https://i.imgur.com/kKzKmA0.png" },
        { name: "Marcos T.", text: "Eu já tinha gastado muito dinheiro com pai de santo e nada. Essa corrente foi a única coisa que funcionou. Minha amada voltou pra mim.", likes: 204, image: "https://i.imgur.com/SVV6zrv.png" },
        { name: "Fernanda L.", text: "Perfeito! Estava com o coração na mão, mas segui cada passo. Ele está mais carinhoso do que nunca. Recomendo de olhos fechados.", likes: 98, image: "https://i.imgur.com/VhoVk3r.png" },
        { name: "Lucas M.", text: "Impressionante. Ela me ligou no sétimo dia, parecia mágica. A gente tinha brigado feio. Essa corrente é poderosa.", likes: 77, image: "https://i.imgur.com/Fo0ktY8.jpeg" },
    ];


  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="w-full bg-red-600 text-white text-center p-2 text-sm font-semibold">
          <p>ATENÇÃO: Devido ao grande número de acesso essa página vai sair do ar no dia: <span className="text-yellow-400 font-bold">{currentDate}</span></p>
      </div>
      <div className="p-6">
        <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold my-8">
                FAÇA ESSA CORRENTE DE ORAÇÃO E TENHA A PESSOA QUE QUISER AOS SEUS PÉS EM ATÉ 7 DIAS
            </h1>
            
            <div className="aspect-video mb-12">
                <div id="vid_68af21bd6a9a5bd9908ea953" style={{display: 'block', margin: '0 auto', width: '100%'}}></div>
                <Script 
                  id="vturb-player-script"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
                      var s=document.createElement("script");
                      s.src="https://scripts.converteai.net/eaf579c8-6aa1-4f6f-b5bd-8ba46f9e23f8/players/68af21bd6a9a5bd9908ea953/v4/player.js";
                      s.async=true;
                      document.head.appendChild(s);
                    `
                  }}
                />
            </div>

            <div className="max-w-2xl mx-auto text-left">
              <h2 className="text-xl font-bold mb-4 text-white">Comentários</h2>
              <div className="border-t border-neutral-700 mb-6"></div>

              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-3">
                     <Avatar>
                        <AvatarImage src={comment.image} alt={comment.name} />
                        <AvatarFallback>{comment.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold text-red-500">{comment.name}</p>
                      <p className="text-neutral-300">{comment.text}</p>
                      <div className="flex items-center text-neutral-500 text-sm mt-1">
                        <ThumbsUp className="w-4 h-4 mr-1 text-blue-500" />
                        <Heart className="w-4 h-4 mr-1 text-red-500 fill-current" />
                        <span>{comment.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
