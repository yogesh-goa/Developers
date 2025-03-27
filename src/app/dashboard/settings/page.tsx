import { CreditCard, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6 pl-40 w-full flex justify-center items-center flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <User className="h-10 w-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Button size="sm">Upload New Image</Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Inc." />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Authenticator App</div>
                  <div className="text-sm text-muted-foreground">
                    Use an authenticator app to generate one-time codes
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Text Message</div>
                  <div className="text-sm text-muted-foreground">Receive codes via SMS</div>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Setup 2FA</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Pro Plan</div>
                    <div className="text-sm text-muted-foreground">$79/month, billed monthly</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Plan
                  </Button>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Your next billing date is <span className="font-medium">April 1, 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 04/2026</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="outline">Add Payment Method</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your billing history and download invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "INV-001",
                    date: "Mar 1, 2025",
                    amount: "$79.00",
                    status: "Paid",
                  },
                  {
                    id: "INV-002",
                    date: "Feb 1, 2025",
                    amount: "$79.00",
                    status: "Paid",
                  },
                  {
                    id: "INV-003",
                    date: "Jan 1, 2025",
                    amount: "$79.00",
                    status: "Paid",
                  },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">Invoice {invoice.id}</div>
                      <div className="text-sm text-muted-foreground">{invoice.date}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">{invoice.amount}</div>
                      <div className="text-sm text-green-500">{invoice.status}</div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Agent Activity</div>
                        <div className="text-sm text-muted-foreground">
                          Receive updates about your AI agents' performance
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Earnings Reports</div>
                        <div className="text-sm text-muted-foreground">Receive weekly and monthly earnings reports</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Marketing Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Receive news about new features and promotions
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-4 text-lg font-medium">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>Agent Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Receive alerts when your agents need attention
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div>New Sales</div>
                        <div className="text-sm text-muted-foreground">Receive notifications for new sales</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for integrating with our platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Production API Key</div>
                    <div className="text-sm text-muted-foreground">Created on Mar 15, 2025</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Reveal
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Development API Key</div>
                    <div className="text-sm text-muted-foreground">Created on Mar 10, 2025</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Reveal
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="outline">Create New API Key</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Configure webhooks to receive real-time updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Agent Activity Webhook</div>
                    <div className="text-sm text-muted-foreground">https://example.com/webhooks/agent-activity</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="outline">Add Webhook</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

