
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

const quizSteps = [
  {
    title: 'DEIXE QUALQUER PESSOA AOS SEUS PÉS, ',
    highlight: 'EM MENOS DE 7 DIAS',
    question: 'QUAL SEU SEXO?',
    options: [
      { text: 'MULHER', image: 'https://i.imgur.com/HVbHMfJ.png' },
      { text: 'HOMEM', image: 'https://i.imgur.com/qrr0DWy.png' },
    ],
    type: 'image',
  },
  {
    question: 'QUAL SEXO DO SEU PRETENDENTE?',
    options: [
        { text: 'MULHER', image: 'https://i.imgur.com/HVbHMfJ.png' },
        { text: 'HOMEM', image: 'https://i.imgur.com/qrr0DWy.png' },
    ],
    type: 'image',
  },
  {
    question: 'O QUE VOCÊ DESEJA ALCANÇAR COM A CORRENTE?',
    image: 'https://i.imgur.com/Dn2RvTp.jpeg',
    options: ['REATAR UM RELACIONAMENTO', 'CONQUISTAR UM NOVO AMOR'],
    type: 'text',
  },
  {
    question: 'COMO ESSA PESSOA SE ENCONTRA HOJE?',
    image: 'https://i.imgur.com/mxu9rjT.jpeg',
    options: ['CASADA', 'NAMORANDO', 'SOLTEIRA', 'NÃO SEI'],
    type: 'text',
  },
  {
    question: 'VOCÊS MANTÉM CONTATO?',
    image: 'https://i.imgur.com/KXB8MlZ.jpeg',
    options: ['SIM', 'NÃO', 'AS VEZES'],
    type: 'text',
  },
  {
    question: 'VOCÊ ACHA QUE ESSA PESSOA AINDA TE AMA?',
    image: 'https://i.imgur.com/EhESUOK.jpeg',
    options: ['SIM', 'NÃO', 'TENHO DUVIDAS'],
    type: 'text',
  },
  {
    question: 'DE 0 A 10 QUANTO ESSA PESSOA É IMPORTANTE PARA VOCÊ?',
    image: 'https://i.imgur.com/s1V9qrP.jpeg',
    options: ['DE 0 A 3', 'DE 4 A 7', 'DE 8 A 9', '10'],
    type: 'text',
  },
  {
    question: 'DE 0 A 10 QUAL SEU AMOR POR ESSA PESSOA?',
    image: 'https://i.imgur.com/YG01vJx.jpeg',
    options: ['DE 0 A 3', 'DE 4 A 7', 'DE 8 A 9', '10'],
    type: 'text',
  },
  {
    question: 'EM ALGUM MOMENTO VOCÊ JA DISSE QUE AMA ESSA PESSOA?',
    image: 'https://i.imgur.com/Vx1AAHY.jpeg',
    options: ['SIM', 'NÃO', 'VARIAS VEZES'],
    type: 'text',
  },
  {
    question: 'VOCÊ JA BUSCOU AJUDA ESPIRITUAL PARA TER ESSA PESSOA?',
    image: 'https://i.imgur.com/4yTnx30.jpeg',
    options: ['SIM, UM PAI DE SANTO', 'SIM, UM TARÓLOGO', 'SIM, UM PASTOR', 'NÃO, NUNCA BUSQUEI'],
    type: 'text',
  },
  {
    question: 'VOCÊ JA FEZ ALGUM TRABALHO ESPIRITUAL?',
    image: 'https://i.imgur.com/N0VtXHi.jpeg',
    options: ['SIM, AMARRAÇÃO', 'SIM, REZAS', 'SIM, ORAÇÔES', 'NÃO, NUNCA FIZ'],
    type: 'text',
  },
  {
    question: 'AGORA VAMOS ANALISAR SEU NÍVEL DE FÉ, PARA LIBERAR SEU ACESSO A CORRENTE!',
    options: ['CONTINUAR'],
    type: 'text-only-button',
  },
  {
    question: 'VOCÊ TEM FÉ, QUE ESSA CORRENTE ESPIRITUAL PODE DEIXAR SEU PRETENDENTE LOUCO DE AMOR POR VOCÊ?',
    image: 'https://i.imgur.com/OHjsJZN.png',
    options: ['SIM', 'NÃO'],
    type: 'text',
  },
  {
    question: 'VOCÊ TEM FÉ, QUE AO FAZER A CORRENTE SEU PRETENDENTE VAI TE PROCURAR DENTRO DE 7 DIAS?',
    image: 'https://i.imgur.com/5YLq0t9.jpeg',
    options: ['SIM', 'NÃO'],
    type: 'text',
  },
  {
    question: 'VOCÊ TEM FÉ, QUE AS FORÇAS ESPIRITUAIS PODEM AFASTAR TODO MAL DA SUA VIDA AMOROSA?',
    image: 'https://i.imgur.com/FSdoBBX.jpeg',
    options: ['SIM', 'NÃO'],
    type: 'text',
  },
  {
    question: 'VOCÊ DESCONFIA QUE FOI FEITO ALGUM TRABALHO DE MAGIA NEGRA PARA VOCÊ?',
    image: 'https://i.imgur.com/XV6zyHr.jpeg',
    options: ['SIM', 'NÃO'],
    type: 'text',
  },
  {
    question: 'RESPONDA COM SINCERIDADE, SE LIBERARMOS O ACESSO A CORRENTE DO AMOR, VOCÊ PROMETE FAZER AS REZAS TODOS OS 7 DIAS?',
    image: 'https://i.imgur.com/yMFAL1A.jpeg',
    options: ['SIM', 'NÃO'],
    type: 'text',
  },
];

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
            clearInterval(timer);
            router.push('/chavedocoracao/vsl');
            return 100;
            }
            return prev + 5;
        });
        }, 150);

        return () => {
        clearInterval(timer);
        };
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h2 className="text-2xl font-bold mb-8">LIBERANDO SEU ACESSO</h2>
            <div className="w-full max-w-md">
                <Progress value={progress} className="w-full h-4 bg-gray-700 [&>div]:bg-red-600" />
                <p className="text-center mt-2 text-lg">{progress}%</p>
            </div>
        </div>
    );
};


export default function ChaveDoCoracaoQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNextStep = () => {
    if (currentStep < quizSteps.length -1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step, go to loading screen
      setCurrentStep(currentStep + 1);
    }
  };

  if (currentStep >= quizSteps.length) {
    return <LoadingScreen />;
  }

  const step = quizSteps[currentStep];
  const progressPercentage = ((currentStep + 1) / quizSteps.length) * 100;

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-start text-white p-6 font-sans">
        <div className="w-full max-w-4xl px-4 py-2">
            <Progress value={progressPercentage} className="h-2 bg-gray-700 [&>div]:bg-red-600" />
        </div>
        <Image src="https://i.imgur.com/9Urc5Rq.png" alt="Chave do Coração" width={100} height={100} className="my-6" />
      <div className="text-center max-w-4xl mx-auto">
        {step.title && 
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {step.title}
                {step.highlight && <span className="text-red-600">{step.highlight}</span>}
            </h1>
        }
        <h2 className="text-2xl md:text-3xl mt-8 mb-12 font-semibold">{step.question}</h2>

        {step.type === 'image' && (
          <div className="grid grid-cols-2 justify-center items-start gap-4">
            {step.options.map((opt, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <Image src={opt.image || ''} alt={opt.text} width={120} height={120} className="rounded-lg" />
                <Button onClick={handleNextStep} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 text-base w-full max-w-[120px]">
                  {opt.text}
                </Button>
              </div>
            ))}
          </div>
        )}

        {step.type === 'text' && (
            <div className="flex flex-col items-center gap-8">
                {step.image && <Image src={step.image} alt="Ilustração da pergunta" width={500} height={300} className="rounded-lg mb-4" />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    {step.options.map((opt, index) => (
                    <Button key={index} onClick={handleNextStep} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 text-lg">
                        {opt}
                    </Button>
                    ))}
                </div>
          </div>
        )}
        
        {step.type === 'text-only-button' && (
             <div className="flex flex-col items-center gap-8">
                <Button onClick={handleNextStep} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-16 text-xl">
                    {step.options[0]}
                </Button>
            </div>
        )}
      </div>
      <footer className="mt-auto pt-20 pb-4 text-center text-gray-500 text-sm">
        <p>As 7 chaves do coração todos os direitos reservados 2025</p>
      </footer>
    </div>
  );
}
