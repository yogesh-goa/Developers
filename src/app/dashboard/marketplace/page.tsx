import { Bot, Filter, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample marketplace agents data
const marketplaceAgents = [
  {
    id: "1",
    name: "Advanced Customer Support Bot",
    description: "Enterprise-grade customer support agent with multi-language capabilities",
    category: "Support",
    price: "$49.99/month",
    rating: 4.8,
    reviews: 124,
    author: "AI Solutions Inc.",
    tags: ["Customer Support", "Enterprise", "Multi-language"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "SEO Content Generator Pro",
    description: "Create SEO-optimized content for blogs, websites, and social media",
    category: "Content",
    price: "$39.99/month",
    rating: 4.6,
    reviews: 98,
    author: "Content AI Labs",
    tags: ["Content", "SEO", "Marketing"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Financial Advisor Bot",
    description: "Personal finance advice and investment recommendations",
    category: "Finance",
    price: "$59.99/month",
    rating: 4.7,
    reviews: 87,
    author: "FinTech AI",
    tags: ["Finance", "Investment", "Advisory"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "E-commerce Sales Assistant",
    description: "Boost conversions with personalized product recommendations",
    category: "E-commerce",
    price: "$44.99/month",
    rating: 4.5,
    reviews: 76,
    author: "Retail AI Solutions",
    tags: ["E-commerce", "Sales", "Recommendations"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Legal Document Analyzer",
    description: "Review and analyze legal documents with high accuracy",
    category: "Legal",
    price: "$69.99/month",
    rating: 4.9,
    reviews: 65,
    author: "LegalTech AI",
    tags: ["Legal", "Document Analysis", "Compliance"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Healthcare Assistant",
    description: "Patient support and medical information assistant",
    category: "Healthcare",
    price: "$54.99/month",
    rating: 4.7,
    reviews: 92,
    author: "MedTech AI",
    tags: ["Healthcare", "Patient Support", "Medical"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
          <p className="text-muted-foreground">Discover and purchase pre-built AI agents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Bot className="mr-2 h-4 w-4" />
            List Your Agent
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search agents..." />
          <Button type="submit" size="icon" variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Select defaultValue="popular">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketplaceAgents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription>by {agent.author}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{agent.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">({agent.reviews} reviews)</span>
                    </div>
                    <div className="text-sm font-medium">{agent.price}</div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 px-6 py-3">
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents would be similar but filtered by category */}
        <TabsContent value="support" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketplaceAgents
              .filter((agent) => agent.category === "Support")
              .map((agent) => (
                <Card key={agent.id} className="overflow-hidden">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription>by {agent.author}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{agent.rating}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({agent.reviews} reviews)</span>
                      </div>
                      <div className="text-sm font-medium">{agent.price}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 px-6 py-3">
                    <Button className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Similar structure for other tabs */}
      </Tabs>
    </div>
  )
}

