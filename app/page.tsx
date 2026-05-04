import {
  Globe,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    label: 'Total Domains',
    value: '24',
    change: '+3',
    trend: 'up' as const,
    icon: Globe,
  },
  {
    label: 'Valid Certificates',
    value: '18',
    change: '+2',
    trend: 'up' as const,
    icon: ShieldCheck,
  },
  {
    label: 'Expiring Soon',
    value: '4',
    change: '-1',
    trend: 'down' as const,
    icon: Clock,
  },
  {
    label: 'Expired',
    value: '2',
    change: '+1',
    trend: 'up' as const,
    icon: ShieldAlert,
  },
];

const recentActivity = [
  {
    domain: 'api.acme.com',
    status: 'Valid',
    expires: 'Aug 14, 2026',
    issuer: "Let's Encrypt",
  },
  {
    domain: 'app.starter.io',
    status: 'Expiring Soon',
    expires: 'May 22, 2026',
    issuer: 'DigiCert',
  },
  {
    domain: 'cdn.widget.co',
    status: 'Expired',
    expires: 'Apr 30, 2026',
    issuer: 'Sectigo',
  },
  {
    domain: 'mail.hello.dev',
    status: 'Valid',
    expires: 'Nov 3, 2026',
    issuer: "Let's Encrypt",
  },
  {
    domain: 'shop.retail.io',
    status: 'Expiring Soon',
    expires: 'Jun 1, 2026',
    issuer: 'GlobalSign',
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Valid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Expiring Soon': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Expired: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status] || 'bg-muted text-muted-foreground border-border'}`}
    >
      {status}
    </span>
  );
}

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your SSL certificate monitoring.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-xl border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                    stat.trend === 'up' && stat.label !== 'Expired'
                      ? 'text-emerald-400'
                      : stat.trend === 'down'
                        ? 'text-emerald-400'
                        : 'text-red-400'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Domain
                  </th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Expires
                  </th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Issuer
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item) => (
                  <tr
                    key={item.domain}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-3 font-medium text-foreground">
                      {item.domain}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {item.expires}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {item.issuer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
