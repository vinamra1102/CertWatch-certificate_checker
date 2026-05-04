'use client';

import { Search, Bell } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search domains..."
          className="h-9 w-full rounded-lg border border-border bg-secondary pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
        </button>

        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-blue-400">
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
