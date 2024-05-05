import { Loader } from 'lucide-react';
import React from 'react';

export default function Loading() {
  return (
    <div className="h-full w-full justify-center items-center flex">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
    </div>
  );
}
