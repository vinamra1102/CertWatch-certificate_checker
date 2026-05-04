'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  Bell,
  Settings,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Domains', href: '/domains', icon: Globe },
  { label: 'Alerts', href: '/alerts', icon: Bell },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-[hsl(var(--sidebar))]">
      <div className="flex h-16 items-center gap-2.5 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Shield className="h-4.5 w-4.5 text-primary-foreground" />
        </div>
        <span className="text-base font-semibold tracking-tight text-foreground">
          CertWatch
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]'
                  : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-muted" />
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
