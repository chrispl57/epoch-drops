// components/ClassicThemeProvider.tsx
'use client';
import React from 'react';
type Props = { children: React.ReactNode };
export default function ClassicThemeProvider({ children }: Props) {
  return <div className="classic-era">{children}</div>;
}
