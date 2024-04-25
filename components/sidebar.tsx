import { ClassValue } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';
import SidebarItem from '@/components/sidebar-item';

export function Sidebar({ className }: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        'h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col',
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image alt="lingo logo" height={40} width={40} src="/mascot.svg" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2">
        <SidebarItem iconSrc="/learn.svg" href="/learn" label="learn" />
      </div>
    </div>
  );
}
