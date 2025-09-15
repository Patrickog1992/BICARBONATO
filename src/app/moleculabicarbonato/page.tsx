
'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function BicarbonatoQuizPage() {
  const router = useRouter();

  const handleOptionClick = () => {
    router.push('/moleculabicarbonato/vsl');
  };

  const objectives = [
    { emoji: '🍆', text: 'Aumentar o Tamanho do Pênis' },
    { emoji: '🌶️', text: 'Curar a Disfunção Erétil' },
    { emoji: '🧴', text: 'Tratar a Ejaculação Precoce' },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center text-gray-800 p-6 font-sans">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
          Tenha um pau duro, grande e grosso como uma barra de ferro usando um <span className="text-blue-600">"Truque com Bicarbonato de Sódio"</span> 100% natural
        </h1>
        <p className="text-lg md:text-2xl mt-8 mb-12 text-gray-600">
          Selecione o seu objetivo principal para assistir a apresentação
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {objectives.map((obj, index) => (
            <button
              key={index}
              onClick={handleOptionClick}
              className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center transform hover:scale-105 hover:border-blue-500 transition-all duration-300 shadow-md"
            >
              <div className="text-6xl mb-4">{obj.emoji}</div>
              <p className="text-xl font-semibold text-gray-800">{obj.text}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
