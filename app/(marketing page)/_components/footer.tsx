import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className="hidden md:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/india.svg"
            alt="India"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Hindi
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/spanish.svg"
            alt="spanish"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/germany.svg"
            alt="germany"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          German
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/italian.svg"
            alt="italian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/british.svg"
            alt="british"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          English
        </Button>
      </div>
    </div>
  );
};
