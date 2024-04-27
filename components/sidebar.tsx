import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import React from 'react';

export function Sidebar({ className }: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        'h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col',
        className
      )}
    >
      shdfgksdhjfgkshjdfg
    </div>
  );
}
