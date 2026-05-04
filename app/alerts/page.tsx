'use client';

import { useState, useMemo } from 'react';
import { Bell, Search, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

type Severity = 'critical' | 'warning' | 'info';

interface Alert {
  id: string;
  domain: string;
  alertType: string;
  severity: Severity;
  timestamp: string;
}

const alerts: Alert[] = [
  { id: '1', domain: 'api.acme.com', alertType: 'Certificate Expired', severity: 'critical', timestamp: 'May 4, 2026 08:12 AM' },
  { id: '2', domain: 'cdn.widget.co', alertType: 'Certificate Expiring in 24h', severity: 'critical', timestamp: 'May 4, 2026 07:45 AM' },
  { id: '3', domain: 'app.starter.io', alertType: 'Certificate Expiring in 7 days', severity: 'warning', timestamp: 'May 4, 2026 06:30 AM' },
  { id: '4', domain: 'shop.retail.io', alertType: 'Certificate Expiring in 30 days', severity: 'warning', timestamp: 'May 3, 2026 11:20 PM' },
  { id: '5', domain: 'mail.hello.dev', alertType: 'Certificate Renewed', severity: 'info', timestamp: 'May 3, 2026 09:15 PM' },
  { id: '6', domain: 'auth.secure.net', alertType: 'Issuer Changed', severity: 'warning', timestamp: 'May 3, 2026 04:45 PM' },
  { id: '7', domain: 'docs.platform.io', alertType: 'Certificate Expiring in 30 days', severity: 'warning', timestamp: 'May 3, 2026 02:10 PM' },
  { id: '8', domain: 'status.uptime.co', alertType: 'Certificate Renewed', severity: 'info', timestamp: 'May 2, 2026 10:30 AM' },
  { id: '9', domain: 'web.analytics.dev', alertType: 'New Certificate Detected', severity: 'info', timestamp: 'May 2, 2026 08:00 AM' },
  { id: '10', domain: 'pay.checkout.io', alertType: 'Certificate Expiring in 7 days', severity: 'warning', timestamp: 'May 1, 2026 11:55 PM' },
  { id: '11', domain: 'db.internal.co', alertType: 'Certificate Expired', severity: 'critical', timestamp: 'May 1, 2026 03:22 AM' },
  { id: '12', domain: 'cache.cdn.net', alertType: 'New Certificate Detected', severity: 'info', timestamp: 'Apr 30, 2026 06:40 PM' },
];

const severityConfig: Record<Severity, { label: string; className: string; icon: typeof ShieldAlert }> = {
  critical: {
    label: 'Critical',
    className: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/10',
    icon: ShieldAlert,
  },
  warning: {
    label: 'Warning',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10',
    icon: AlertTriangle,
  },
  info: {
    label: 'Info',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/10',
    icon: Info,
  },
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const { label, className } = severityConfig[severity];
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

export default function AlertsPage() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const matchesSearch = a.domain.toLowerCase().includes(search.toLowerCase()) ||
        a.alertType.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || a.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [search, severityFilter]);

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;
  const infoCount = alerts.filter((a) => a.severity === 'info').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Stay informed about certificate changes and expirations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <ShieldAlert className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{criticalCount}</p>
              <p className="text-sm text-muted-foreground">Critical</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{warningCount}</p>
              <p className="text-sm text-muted-foreground">Warning</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{infoCount}</p>
              <p className="text-sm text-muted-foreground">Info</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg pl-9"
          />
        </div>
        <Select
          value={severityFilter}
          onValueChange={setSeverityFilter}
        >
          <SelectTrigger className="w-full rounded-lg sm:w-[160px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="rounded-xl bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">All Alerts</CardTitle>
          <CardDescription>
            {filtered.length} alert{filtered.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Domain</TableHead>
                <TableHead>Alert Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No alerts found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((alert) => {
                  const Icon = severityConfig[alert.severity].icon;
                  return (
                    <TableRow key={alert.id} className="border-border/50 cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              alert.severity === 'critical'
                                ? 'bg-red-500/10'
                                : alert.severity === 'warning'
                                  ? 'bg-amber-500/10'
                                  : 'bg-blue-500/10'
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 ${
                                alert.severity === 'critical'
                                  ? 'text-red-400'
                                  : alert.severity === 'warning'
                                    ? 'text-amber-400'
                                    : 'text-blue-400'
                              }`}
                            />
                          </div>
                          <span className="font-medium">{alert.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {alert.alertType}
                      </TableCell>
                      <TableCell>
                        <SeverityBadge severity={alert.severity} />
                      </TableCell>
                      <TableCell className="hidden text-right text-muted-foreground sm:table-cell">
                        {alert.timestamp}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
