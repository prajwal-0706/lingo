import { Sidebar } from '@/components/sidebar';
import React from 'react';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Sidebar />
      <main className="pl-[256px] h-full">
        <div className="h-full bg-red-500">{children}</div>
      </main>
    </React.Fragment>
  );
}
