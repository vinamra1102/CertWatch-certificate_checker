'use client';

import { useState } from 'react';
import { Bell, Webhook, Clock, User, OctagonAlert as AlertOctagon, Send, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [threshold30, setThreshold30] = useState(true);
  const [threshold7, setThreshold7] = useState(true);
  const [threshold1, setThreshold1] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@acme.com');

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, notifications, and alert preferences.
        </p>
      </div>

      {/* Notification Settings */}
      <Card className="rounded-xl bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how you receive alerts.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Enable Email Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Receive certificate alerts via email.
              </p>
            </div>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="text-sm font-medium">Webhook URL</Label>
            <p className="text-xs text-muted-foreground">
              Send alert payloads to an external endpoint.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Webhook className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="https://hooks.example.com/certwatch"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="rounded-lg pl-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border pt-4">
          <Button size="sm" className="gap-2 rounded-lg">
            <Send className="h-3.5 w-3.5" />
            Send Test Notification
          </Button>
        </CardFooter>
      </Card>

      {/* Alert Thresholds */}
      <Card className="rounded-xl bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <Clock className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                Alert Thresholds
              </CardTitle>
              <CardDescription>
                Choose when to trigger expiry alerts.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">30 days before expiry</Label>
              <p className="text-xs text-muted-foreground">
                Early warning for upcoming renewals.
              </p>
            </div>
            <Switch checked={threshold30} onCheckedChange={setThreshold30} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">7 days before expiry</Label>
              <p className="text-xs text-muted-foreground">
                Urgent reminder to take action.
              </p>
            </div>
            <Switch checked={threshold7} onCheckedChange={setThreshold7} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">1 day before expiry</Label>
              <p className="text-xs text-muted-foreground">
                Critical last-chance notification.
              </p>
            </div>
            <Switch checked={threshold1} onCheckedChange={setThreshold1} />
          </div>
        </CardContent>
      </Card>

      {/* User Profile */}
      <Card className="rounded-xl bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
              <User className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                User Profile
              </CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border pt-4">
          <Button size="sm" className="rounded-lg">
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      {/* Danger Zone */}
      <Card className="rounded-xl border-red-500/20 bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
              <AlertOctagon className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-red-400">
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions. Proceed with caution.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Remove All Domains</Label>
              <p className="text-xs text-muted-foreground">
                Delete all monitored domains and their certificates.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-lg border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove All
            </Button>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Reset Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Clear all alert history and dismiss active alerts.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-lg border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
