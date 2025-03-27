import Link from "next/link"
import { ArrowUpRight, Bot, DollarSign, Download, LineChart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleAreaChart, SimpleBarChart, SimplePieChart } from "@/components/ui/chart"

export default function DashboardPage() {
  // Sample data for charts
  const revenueData = [
    { name: "Jan", revenue: 1200 },
    { name: "Feb", revenue: 1900 },
    { name: "Mar", revenue: 1500 },
    { name: "Apr", revenue: 2400 },
    { name: "May", revenue: 2800 },
    { name: "Jun", revenue: 3200 },
    { name: "Jul", revenue: 3800 },
  ]

  const usageData = [
    { name: "Mon", calls: 4000 },
    { name: "Tue", calls: 3000 },
    { name: "Wed", calls: 5000 },
    { name: "Thu", calls: 2780 },
    { name: "Fri", calls: 1890 },
    { name: "Sat", calls: 2390 },
    { name: "Sun", calls: 3490 },
  ]

  const agentDistributionData = [
    { name: "Customer Support", value: 45 },
    { name: "Content Generation", value: 25 },
    { name: "Data Analysis", value: 20 },
    { name: "Other", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your AI agents and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button size="sm">
            <Bot className="mr-2 h-4 w-4" />
            Create New Agent
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,890</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,678</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+18.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,482</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+7.4%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue from all your agents</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <SimpleAreaChart data={revenueData} dataKey="revenue" height={300} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>Daily API calls across all agents</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <SimpleBarChart data={usageData} dataKey="calls" height={300} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Agent Distribution</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <SimplePieChart data={agentDistributionData} dataKey="value" nameKey="name" height={300} />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Agents</CardTitle>
            <CardDescription>Based on revenue and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Customer Support Bot",
                  revenue: "$4,890",
                  calls: "89,432",
                  growth: "+24.5%",
                },
                {
                  name: "Content Generator",
                  revenue: "$3,245",
                  calls: "56,789",
                  growth: "+18.2%",
                },
                {
                  name: "Data Analyzer",
                  revenue: "$2,980",
                  calls: "45,678",
                  growth: "+12.7%",
                },
                {
                  name: "Personal Assistant",
                  revenue: "$2,145",
                  calls: "34,567",
                  growth: "+9.3%",
                },
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.calls} API calls</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{agent.revenue}</div>
                    <div className="text-sm text-green-500">{agent.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/agents">
                View All Agents
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

