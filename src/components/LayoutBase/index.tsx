import React from 'react';

interface ILayoutBase {
  children: React.ReactNode;
  isTimeline?: boolean;
}

export default function LayoutBase({ children, isTimeline = false }: ILayoutBase) {
  return (
    <div
      className={`flex min-h-screen ${isTimeline ? 'items-start' : 'items-center'} justify-center bg-[#FAFAFA] dark:bg-linear-to-b dark:from-[#0F172B] dark:to-[#070B14]`}
    >
      <main
        className={`flex justify-center ${isTimeline ? 'items-start' : 'items-center'} gap-14 flex-col ${isTimeline ? 'w-full max-w-160' : 'max-w-120'} `}
      >
        {children}
      </main>
    </div>
  );
}
