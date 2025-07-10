import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TrendingItem {
  id: string;
  title: string;
  count: number;
  category: string;
  change: number; // percentage change
}

const trendingTopics: TrendingItem[] = [
  { id: "1", title: "AI Revolution", count: 1542, category: "Technology", change: 45 },
  { id: "2", title: "Climate Summit", count: 987, category: "World", change: 23 },
  { id: "3", title: "Market Rally", count: 2341, category: "Business", change: 67 },
  { id: "4", title: "Space Mission", count: 765, category: "Science", change: 89 },
  { id: "5", title: "Election Updates", count: 3210, category: "Politics", change: 12 },
  { id: "6", title: "Sports Championship", count: 1876, category: "Sports", change: 34 },
];

export function TrendingBar() {
  return (
    <div className="bg-gradient-to-r from-trending/10 via-primary/5 to-trending/10 border-y">
      <div className="container py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-trending font-semibold">
            <TrendingUp className="w-5 h-5" />
            <span className="hidden sm:inline">Trending Now</span>
            <span className="sm:hidden">Trending</span>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="flex items-center gap-3 pb-2">
              {trendingTopics.map((topic, index) => (
                <Button
                  key={topic.id}
                  variant="ghost"
                  className="flex items-center gap-2 whitespace-nowrap hover:bg-trending/10 h-8"
                >
                  <span className="text-sm font-medium">{topic.title}</span>
                  <Badge variant="secondary" className="text-xs">
                    {topic.count.toLocaleString()}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-positive">
                    <TrendingUp className="w-3 h-3" />
                    {topic.change}%
                  </div>
                  {index < trendingTopics.length - 1 && (
                    <div className="w-px h-4 bg-border ml-2" />
                  )}
                </Button>
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-primary whitespace-nowrap"
              >
                View All
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}