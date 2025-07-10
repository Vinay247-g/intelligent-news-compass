import { Clock, Eye, Share2, Bookmark, TrendingUp, ThumbsUp, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    content?: string;
    source: string;
    author?: string;
    publishedAt: string;
    category: string;
    imageUrl?: string;
    sentiment: "positive" | "neutral" | "negative";
    isBreaking?: boolean;
    isTrending?: boolean;
    readTime: number;
    views: number;
    likes?: number;
    comments?: number;
    url: string;
  };
  variant?: "default" | "featured" | "compact" | "headline";
  className?: string;
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-positive";
      case "negative": return "text-negative";
      default: return "text-neutral";
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryMap: Record<string, string> = {
      politics: "bg-politics",
      technology: "bg-technology",
      business: "bg-business",
      sports: "bg-sports",
      world: "bg-neutral",
      science: "bg-primary",
      health: "bg-positive",
      entertainment: "bg-trending",
    };
    return categoryMap[category.toLowerCase()] || "bg-neutral";
  };

  if (variant === "headline") {
    return (
      <Card className={cn("group cursor-pointer hover:shadow-card transition-all duration-200", className)}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {article.isBreaking && (
                  <Badge variant="destructive" className="animate-pulse">
                    BREAKING
                  </Badge>
                )}
                {article.isTrending && (
                  <Badge className="bg-trending text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                <Badge variant="outline" className={cn("text-xs", getCategoryColor(article.category))}>
                  {article.category}
                </Badge>
              </div>
              
              <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium">{article.source}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}m read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views.toLocaleString()}
                </div>
              </div>
            </div>
            
            {article.imageUrl && (
              <div className="w-24 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={cn("group cursor-pointer hover:shadow-card transition-all duration-200", className)}>
        <CardContent className="p-3">
          <div className="flex gap-3">
            {article.imageUrl && (
              <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h4>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{article.source}</span>
                <span>•</span>
                <span>{article.readTime}m</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card className={cn("group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden", className)}>
        {article.imageUrl && (
          <div className="relative h-48 bg-muted overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
              {article.isBreaking && (
                <Badge variant="destructive" className="animate-pulse">
                  BREAKING
                </Badge>
              )}
              {article.isTrending && (
                <Badge className="bg-trending text-white">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
            
            <Badge 
              variant="secondary" 
              className={cn("absolute bottom-4 left-4", getCategoryColor(article.category))}
            >
              {article.category}
            </Badge>
          </div>
        )}
        
        <CardContent className="p-6">
          <h2 className="font-bold text-xl leading-tight mb-3 group-hover:text-primary transition-colors">
            {article.title}
          </h2>
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  {article.source.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{article.source}</p>
                {article.author && (
                  <p className="text-xs text-muted-foreground">by {article.author}</p>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <Clock className="w-3 h-3" />
                {article.readTime}m read
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="w-3 h-3" />
                {article.views.toLocaleString()} views
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {article.likes && (
                <div className="flex items-center gap-1 text-muted-foreground hover:text-positive transition-colors cursor-pointer">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{article.likes}</span>
                </div>
              )}
              {article.comments && (
                <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{article.comments}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("group cursor-pointer hover:shadow-card transition-all duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {article.isBreaking && (
                <Badge variant="destructive" className="animate-pulse">
                  BREAKING
                </Badge>
              )}
              {article.isTrending && (
                <Badge className="bg-trending text-white">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              )}
              <Badge variant="outline" className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              <div className={cn("w-2 h-2 rounded-full", getSentimentColor(article.sentiment))}></div>
            </div>
            
            <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium">{article.source}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}m read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views.toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {article.imageUrl && (
            <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}