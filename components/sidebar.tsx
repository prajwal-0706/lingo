import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ClassValue } from 'clsx';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';

import SidebarItem from '@/components/sidebar-item';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

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
      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem iconSrc="/learn.svg" href="/learn" label="learn" />
        <SidebarItem
          iconSrc="/leaderboard.svg"
          href="/leaderboard"
          label="Leaderboard"
        />
        <SidebarItem iconSrc="/quest.svg" href="/quests" label="quests" />
        <SidebarItem iconSrc="/shop.svg" href="/shop" label="shop" />
      </div>
      <div className="p-4 ">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
}
