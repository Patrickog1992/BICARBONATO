import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center">
      <Image 
        src="https://i.imgur.com/pGyjq58.png" 
        alt="CodeLove Logo" 
        width={180} 
        height={46} 
        className="object-contain"
        priority
      />
    </div>
  );
}
