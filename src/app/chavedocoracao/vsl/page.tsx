
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, Heart } from 'lucide-react';

export default function VSLChaveDoCoracaoPage() {

    const comments = [
        { name: "Juliana R.", text: "Fiz a corrente com muita fé e em 5 dias ele me procurou! Não acreditei, estava desesperada. Obrigada!", likes: 138, image: "https://i.imgur.com/kKzKmA0.png" },
        { name: "Marcos T.", text: "Eu já tinha gastado muito dinheiro com pai de santo e nada. Essa corrente foi a única coisa que funcionou. Minha amada voltou pra mim.", likes: 204, image: "https://i.imgur.com/SVV6zrv.png" },
        { name: "Fernanda L.", text: "Perfeito! Estava com o coração na mão, mas segui cada passo. Ele está mais carinhoso do que nunca. Recomendo de olhos fechados.", likes: 98, image: "https://i.imgur.com/VhoVk3r.png" },
        { name: "Lucas M.", text: "Impressionante. Ela me ligou no sétimo dia, parecia mágica. A gente tinha brigado feio. Essa corrente é poderosa.", likes: 77, image: "https://i.imgur.com/Fo0ktY8.jpeg" },
    ];


  return (
    <div className="bg-black min-h-screen text-white p-6 font-sans">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
            FAÇA ESSA CORRENTE DE ORAÇÃO E TENHA A PESSOA QUE QUISER AOS SEUS PÉS EM ATÉ 7 DIAS
        </h1>
        
        <div className="aspect-video bg-neutral-800 rounded-lg mb-12 flex items-center justify-center">
            <p className="text-neutral-400">Seu vídeo (VSL) aparecerá aqui</p>
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
  );
}
