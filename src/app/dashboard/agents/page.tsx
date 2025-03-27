'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Plus, MoreHorizontal, Users, BarChart } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { useAuth, UserButton } from "@clerk/nextjs"

export default function AgentsPage() {
  interface Agent {
    id: string;
    name: string;
    monetization: {
      model: string;
      isMarketplaceListed: boolean;
      _id: string;
    };
    createdAt: string;
    description: string;
    model: string;
    status: string;
    users: number;
    apiCalls: number;
    price: string;
    owner:string;
  }
  const { isLoaded, isSignedIn, userId } = useAuth()
useEffect(() => {
    fetch('/api/getUserAgents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
        .then((response) => response.json())
        .then((data) => {
            const updatedAgents = Array.isArray(data) ? data.map((agent: Agent) => ({
                ...agent,
                description: agent.description || "A newly created agent for testing purposes",
                model: agent.model || "Not specified",
                status: agent.status || "draft",
                users: agent.users || 0,
                apiCalls: agent.apiCalls || 0,
                price: agent.price || "Free",
            })) : [];
            setagents(updatedAgents);
        })
        .catch((error) => console.error('Error fetching agents:', error));
}, [userId]);
  const [agents, setagents] = useState<Agent[]>([])
  
    if (!isLoaded) {
      return <div>Loading...</div>
    }
    if (!isSignedIn) {
      // You could also add a redirect to the sign-in page here
      return <div>Sign in to view this page</div>
    }
    
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href={'/'} className="flex items-center gap-2 font-bold text-xl">
            <Bot className="h-6 w-6 text-primary" />
            <span>AutoAgent</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/dashboard/agents" className="text-sm font-medium hover:underline underline-offset-4">
              My Agents
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            
            <UserButton/>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 px-6">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My AI Agents</h1>
              <p className="text-muted-foreground">Manage and monitor your AI agents</p>
            </div>
            <Link href="/dashboard/builder">
              <Button className="mt-4 md:mt-0 gap-2">
                <Plus className="h-4 w-4" /> Create New Agent
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {agent.name}
                        {agent.status === "active" && (
                          <Badge variant="default" className="ml-2">
                            Active
                          </Badge>
                        )}
                        {agent.status === "draft" && (
                          <Badge variant="outline" className="ml-2">
                            Draft
                          </Badge>
                        )}
                        {agent.status === "inactive" && (
                          <Badge variant="secondary" className="ml-2">
                            Inactive
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{agent.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Analytics</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Model</div>
                      <div className="font-medium">{agent.model}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Created</div>
                      <div className="font-medium">{agent.createdAt}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Pricing</div>
                      <div className="font-medium">{agent.price}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Type</div>
                      <div className="font-medium capitalize">{agent.monetization.model}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{agent.users.toLocaleString()} users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{agent.apiCalls.toLocaleString()} calls</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}