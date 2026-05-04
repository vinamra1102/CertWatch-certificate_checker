'use client';

import { useState, useMemo } from 'react';
import { Plus, Search, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
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

type DomainStatus = 'active' | 'expiring' | 'critical';

interface Domain {
  id: string;
  name: string;
  status: DomainStatus;
  issuer: string;
  expiryDate: string;
  daysRemaining: number;
}

const domains: Domain[] = [
  { id: '1', name: 'api.acme.com', status: 'critical', issuer: "Let's Encrypt", expiryDate: 'May 5, 2026', daysRemaining: 1 },
  { id: '2', name: 'cdn.widget.co', status: 'critical', issuer: 'Sectigo', expiryDate: 'May 6, 2026', daysRemaining: 2 },
  { id: '3', name: 'app.starter.io', status: 'expiring', issuer: 'DigiCert', expiryDate: 'May 22, 2026', daysRemaining: 18 },
  { id: '4', name: 'shop.retail.io', status: 'expiring', issuer: 'GlobalSign', expiryDate: 'Jun 1, 2026', daysRemaining: 28 },
  { id: '5', name: 'mail.hello.dev', status: 'expiring', issuer: "Let's Encrypt", expiryDate: 'Jun 3, 2026', daysRemaining: 30 },
  { id: '6', name: 'auth.secure.net', status: 'active', issuer: 'DigiCert', expiryDate: 'Jul 19, 2026', daysRemaining: 76 },
  { id: '7', name: 'docs.platform.io', status: 'active', issuer: "Let's Encrypt", expiryDate: 'Aug 4, 2026', daysRemaining: 92 },
  { id: '8', name: 'status.uptime.co', status: 'active', issuer: 'Sectigo', expiryDate: 'Aug 1, 2026', daysRemaining: 89 },
  { id: '9', name: 'web.analytics.dev', status: 'active', issuer: 'GlobalSign', expiryDate: 'Sep 15, 2026', daysRemaining: 134 },
  { id: '10', name: 'pay.checkout.io', status: 'active', issuer: 'DigiCert', expiryDate: 'Oct 22, 2026', daysRemaining: 171 },
  { id: '11', name: 'db.internal.co', status: 'active', issuer: "Let's Encrypt", expiryDate: 'Nov 30, 2026', daysRemaining: 210 },
  { id: '12', name: 'cache.cdn.net', status: 'active', issuer: 'Sectigo', expiryDate: 'Dec 14, 2026', daysRemaining: 224 },
];

const PAGE_SIZE = 8;

const statusConfig: Record<DomainStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10',
  },
  expiring: {
    label: 'Expiring',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/10',
  },
  critical: {
    label: 'Critical',
    className: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/10',
  },
};

function StatusBadge({ status }: { status: DomainStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

export default function DomainsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    return domains.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const activeCount = domains.filter((d) => d.status === 'active').length;
  const expiringCount = domains.filter((d) => d.status === 'expiring').length;
  const criticalCount = domains.filter((d) => d.status === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Domains</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor and manage your SSL certificates.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Domain</DialogTitle>
              <DialogDescription>
                Enter the domain you want to monitor for SSL certificate changes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Domain Name</label>
                <Input placeholder="example.com" className="rounded-lg" />
              </div>
            </div>
            <DialogFooter>
              <Button className="rounded-lg">Add Domain</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
              <Globe className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <Globe className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{expiringCount}</p>
              <p className="text-sm text-muted-foreground">Expiring</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <Globe className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{criticalCount}</p>
              <p className="text-sm text-muted-foreground">Critical</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search domains..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="rounded-lg pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(val) => {
            setStatusFilter(val);
            setPage(0);
          }}
        >
          <SelectTrigger className="w-full rounded-lg sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expiring">Expiring</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="rounded-xl bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Domain Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Issuer</TableHead>
                <TableHead className="hidden md:table-cell">Expiry Date</TableHead>
                <TableHead className="text-right">Days Remaining</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No domains found.
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((domain) => (
                  <TableRow key={domain.id} className="border-border/50 cursor-pointer">
                    <TableCell className="font-medium">{domain.name}</TableCell>
                    <TableCell>
                      <StatusBadge status={domain.status} />
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {domain.issuer}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {domain.expiryDate}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <span
                        className={
                          domain.daysRemaining <= 2
                            ? 'font-semibold text-red-400'
                            : domain.daysRemaining <= 30
                              ? 'font-semibold text-amber-400'
                              : 'text-muted-foreground'
                        }
                      >
                        {domain.daysRemaining}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Showing {page * PAGE_SIZE + 1}&ndash;{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{' '}
              {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
