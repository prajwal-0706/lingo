import { MobileHeader } from '@/components/mobile-header';
import { Sidebar } from '@/components/sidebar';
import React from 'react';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="h-full bg-red-500">{children}</div>
      </main>
    </React.Fragment>
  );
}
