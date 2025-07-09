import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center">
      <Image 
        src="https://i.imgur.com/bJxEkd2.png" 
        alt="CodeLove Logo" 
        width={180} 
        height={24} 
        className="object-contain"
        priority
      />
    </div>
  );
}
