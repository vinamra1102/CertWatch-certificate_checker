'use client';

import { AlertTriangle, Globe, Clock, Timer, Zap } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    label: 'Total Domains',
    value: '48',
    icon: Globe,
  },
  {
    label: 'Expiring in 30 days',
    value: '12',
    icon: Clock,
  },
  {
    label: 'Expiring in 7 days',
    value: '6',
    icon: Timer,
  },
  {
    label: 'Expiring in 24 hours',
    value: '2',
    icon: Zap,
  },
];

const chartData = [
  { date: 'May 5', expiring: 2 },
  { date: 'May 8', expiring: 3 },
  { date: 'May 12', expiring: 1 },
  { date: 'May 15', expiring: 5 },
  { date: 'May 19', expiring: 4 },
  { date: 'May 22', expiring: 2 },
  { date: 'May 26', expiring: 6 },
  { date: 'May 30', expiring: 3 },
  { date: 'Jun 2', expiring: 1 },
  { date: 'Jun 5', expiring: 4 },
  { date: 'Jun 9', expiring: 2 },
  { date: 'Jun 12', expiring: 3 },
];

const alerts = [
  {
    domain: 'api.acme.com',
    status: 'critical',
    daysRemaining: 0,
  },
  {
    domain: 'cdn.widget.co',
    status: 'critical',
    daysRemaining: 1,
  },
  {
    domain: 'app.starter.io',
    status: 'warning',
    daysRemaining: 5,
  },
  {
    domain: 'shop.retail.io',
    status: 'warning',
    daysRemaining: 12,
  },
  {
    domain: 'mail.hello.dev',
    status: 'warning',
    daysRemaining: 18,
  },
  {
    domain: 'auth.secure.net',
    status: 'ok',
    daysRemaining: 45,
  },
  {
    domain: 'docs.platform.io',
    status: 'ok',
    daysRemaining: 62,
  },
  {
    domain: 'status.uptime.co',
    status: 'ok',
    daysRemaining: 89,
  },
];

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    critical: {
      label: 'Critical',
      className:
        'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/10',
    },
    warning: {
      label: 'Warning',
      className:
        'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10',
    },
    ok: {
      label: 'OK',
      className:
        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10',
    },
  };

  const { label, className } = config[status] || {
    label: status,
    className: '',
  };

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-xl">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">
        {payload[0].value} expiring
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card className="relative overflow-hidden rounded-xl border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-card to-card">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <CardContent className="flex items-center gap-6 p-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10">
            <AlertTriangle className="h-7 w-7 text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              Certificates expiring soon
            </p>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-5xl font-bold tracking-tight text-amber-400">
                6
              </span>
              <span className="text-sm text-muted-foreground">
                within the next 7 days
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">24h</p>
              <p className="text-lg font-semibold text-red-400">2</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground">7d</p>
              <p className="text-lg font-semibold text-amber-400">6</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground">30d</p>
              <p className="text-lg font-semibold text-foreground">12</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-xl bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-3">
                <span className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <Card className="rounded-xl bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Expiry Timeline
          </CardTitle>
          <CardDescription>
            Certificates expiring over the next 6 weeks
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(222, 47%, 14%)"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(215, 20%, 55%)' }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(215, 20%, 55%)' }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="expiring"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2}
                  fill="url(#fillGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts Table */}
      <Card className="rounded-xl bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Recent Alerts
          </CardTitle>
          <CardDescription>
            Domains requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Days Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.domain} className="border-border/50">
                  <TableCell className="font-medium">{alert.domain}</TableCell>
                  <TableCell>
                    <StatusBadge status={alert.status} />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    <span
                      className={
                        alert.daysRemaining <= 1
                          ? 'font-semibold text-red-400'
                          : alert.daysRemaining <= 7
                            ? 'font-semibold text-amber-400'
                            : 'text-muted-foreground'
                      }
                    >
                      {alert.daysRemaining === 0
                        ? 'Today'
                        : alert.daysRemaining === 1
                          ? 'Tomorrow'
                          : `${alert.daysRemaining} days`}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
