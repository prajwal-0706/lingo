'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

type SideBarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
};

export default function SidebarItem({
  label,
  iconSrc,
  href,
}: SideBarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      asChild
      className="justify-start h-[52px]"
      variant={isActive ? 'sidebarOutline' : 'sidebar'}
    >
      <Link href={href}>
        <Image
          alt={label}
          className="mr-5"
          height={28}
          width={28}
          src={iconSrc}
        />
        {label}
      </Link>
    </Button>
  );
}
