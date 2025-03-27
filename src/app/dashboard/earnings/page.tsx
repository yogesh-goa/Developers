import { ArrowDownRight, ArrowUpRight, Calendar, CreditCard, Download, Filter, LineChart, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart as RechartsLineChart,
} from "@/components/ui/chart"

export default function EarningsPage() {
  // Sample data for charts
  const monthlyEarnings = [
    { name: "Jan", earnings: 1200, expenses: 400 },
    { name: "Feb", earnings: 1900, expenses: 450 },
    { name: "Mar", earnings: 1500, expenses: 420 },
    { name: "Apr", earnings: 2400, expenses: 480 },
    { name: "May", earnings: 2800, expenses: 520 },
    { name: "Jun", earnings: 3200, expenses: 550 },
    { name: "Jul", earnings: 3800, expenses: 600 },
  ]

  const revenueByAgent = [
    { name: "Customer Support Bot", value: 4890 },
    { name: "Content Generator", value: 3245 },
    { name: "Data Analyzer", value: 2980 },
    { name: "Personal Assistant", value: 2145 },
    { name: "E-commerce Helper", value: 980 },
  ]

  const transactions = [
    {
      id: "TX123456",
      date: "2025-03-15",
      description: "Customer Support Bot Subscription",
      amount: 499.99,
      status: "completed",
    },
    {
      id: "TX123457",
      date: "2025-03-14",
      description: "Content Generator Usage",
      amount: 299.5,
      status: "completed",
    },
    {
      id: "TX123458",
      date: "2025-03-12",
      description: "Data Analyzer API Calls",
      amount: 199.99,
      status: "completed",
    },
    {
      id: "TX123459",
      date: "2025-03-10",
      description: "Personal Assistant Subscription",
      amount: 149.99,
      status: "completed",
    },
    {
      id: "TX123460",
      date: "2025-03-08",
      description: "Platform Fee",
      amount: -99.99,
      status: "completed",
    },
    {
      id: "TX123461",
      date: "2025-03-05",
      description: "Marketplace Commission",
      amount: -79.99,
      status: "completed",
    },
    {
      id: "TX123462",
      date: "2025-03-01",
      description: "Payout to Bank Account",
      amount: -1200.0,
      status: "completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Earnings</h2>
          <p className="text-muted-foreground">Track your revenue, expenses, and payouts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,890</div>
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+12.5% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,245</div>
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+5.2% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245</div>
            <div className="flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <p className="text-xs text-green-500">+8.7% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,890</div>
            <div className="flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-yellow-500" />
              <p className="text-xs text-yellow-500">Processing</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Monthly earnings and expenses</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyEarnings}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Area type="monotone" dataKey="earnings" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="expenses" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Agent</CardTitle>
                  <CardDescription>Top earning agents</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueByAgent}
                      layout="vertical"
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Trend</CardTitle>
                  <CardDescription>Monthly earnings growth</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={monthlyEarnings}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="earnings" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent earnings and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} · {transaction.id}
                        </div>
                      </div>
                      <div
                        className={`text-right font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount.toFixed(2)} USD
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payout Settings</CardTitle>
                <CardDescription>Manage your payout methods and schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Bank Account (Primary)</div>
                          <div className="text-sm text-muted-foreground">**** **** **** 1234</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-muted-foreground">user@example.com</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="font-medium mb-2">Payout Schedule</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      You are currently set to receive payouts monthly.
                    </div>
                    <Select defaultValue="monthly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select payout frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="font-medium mb-2">Minimum Payout Amount</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      You will only receive a payout when your balance exceeds this amount.
                    </div>
                    <Select defaultValue="100">
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">$50</SelectItem>
                        <SelectItem value="100">$100</SelectItem>
                        <SelectItem value="250">$250</SelectItem>
                        <SelectItem value="500">$500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Save Payout Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

