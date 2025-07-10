import { Home, TrendingUp, Globe, Users, Settings, Bookmark, Clock, Eye, BarChart3, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const navigation = [
  { name: "Home", href: "/", icon: Home, badge: null },
  { name: "Trending", href: "/trending", icon: TrendingUp, badge: "Hot" },
  { name: "For You", href: "/for-you", icon: Eye, badge: "12" },
  { name: "Following", href: "/following", icon: Users, badge: null },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark, badge: null },
  { name: "Recently Read", href: "/history", icon: Clock, badge: null },
];

const categories = [
  { name: "Politics", href: "/politics", color: "politics", count: 127 },
  { name: "Technology", href: "/technology", color: "technology", count: 89 },
  { name: "Business", href: "/business", color: "business", count: 156 },
  { name: "Sports", href: "/sports", color: "sports", count: 94 },
  { name: "World News", href: "/world", color: "neutral", count: 203 },
  { name: "Science", href: "/science", color: "primary", count: 45 },
  { name: "Health", href: "/health", color: "positive", count: 67 },
  { name: "Entertainment", href: "/entertainment", color: "trending", count: 78 },
];

const sources = [
  { name: "Reuters", verified: true, count: 34 },
  { name: "BBC News", verified: true, count: 28 },
  { name: "Associated Press", verified: true, count: 41 },
  { name: "The Guardian", verified: true, count: 22 },
  { name: "CNN", verified: true, count: 19 },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("main");

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-40 w-80 bg-card border-r transform transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0 lg:static lg:inset-0"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              ×
            </Button>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex mt-4 p-1 bg-muted rounded-lg">
            <Button
              variant={activeTab === "main" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab("main")}
            >
              Main
            </Button>
            <Button
              variant={activeTab === "categories" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </Button>
            <Button
              variant={activeTab === "sources" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab("sources")}
            >
              Sources
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {activeTab === "main" && (
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12 hover:bg-accent/50"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <Badge variant={item.badge === "Hot" ? "destructive" : "secondary"} className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <BarChart3 className="h-5 w-5" />
                    Analytics
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <Filter className="h-5 w-5" />
                    Filters
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                    <Settings className="h-5 w-5" />
                    Settings
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "categories" && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground mb-3">
                  Browse by Category
                </div>
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-10 hover:bg-accent/50"
                  >
                    <div className={cn("w-3 h-3 rounded-full", `bg-${category.color}`)}></div>
                    <span className="flex-1 text-left">{category.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            )}

            {activeTab === "sources" && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground mb-3">
                  Trusted Sources
                </div>
                {sources.map((source) => (
                  <Button
                    key={source.name}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-10 hover:bg-accent/50"
                  >
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">
                        {source.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{source.name}</span>
                        {source.verified && (
                          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs text-primary-foreground">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {source.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}