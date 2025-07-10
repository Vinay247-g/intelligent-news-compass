import { useState, useEffect } from "react";
import { ArticleCard } from "@/components/news/ArticleCard";
import { TrendingBar } from "@/components/news/TrendingBar";
import { FilterBar } from "@/components/news/FilterBar";
import { BreakingNewsAlert } from "@/components/news/BreakingNewsAlert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Eye, TrendingUp, Clock, Star } from "lucide-react";

// Mock data for demonstration
const mockArticles = [
  {
    id: "1",
    title: "AI Revolution Accelerates: OpenAI Announces GPT-5 with Unprecedented Capabilities",
    summary: "The latest AI model demonstrates human-level reasoning across multiple domains, marking a significant leap in artificial intelligence development.",
    source: "Reuters",
    author: "Sarah Johnson",
    publishedAt: "2 hours ago",
    category: "Technology",
    imageUrl: "/api/placeholder/400/200",
    sentiment: "positive" as const,
    isBreaking: true,
    isTrending: true,
    readTime: 5,
    views: 15420,
    likes: 892,
    comments: 234,
    url: "https://example.com/article-1",
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
    summary: "World leaders unite on ambitious climate targets, setting stage for largest environmental initiative in history.",
    source: "BBC News",
    author: "Michael Chen",
    publishedAt: "4 hours ago",
    category: "World",
    imageUrl: "/api/placeholder/400/200",
    sentiment: "positive" as const,
    isBreaking: false,
    isTrending: true,
    readTime: 7,
    views: 23100,
    likes: 1205,
    comments: 456,
    url: "https://example.com/article-2",
  },
  {
    id: "3",
    title: "Stock Market Volatility Continues Amid Economic Uncertainty",
    summary: "Markets show mixed signals as investors weigh inflation concerns against strong employment data.",
    source: "Associated Press",
    publishedAt: "6 hours ago",
    category: "Business",
    sentiment: "neutral" as const,
    isBreaking: false,
    isTrending: false,
    readTime: 4,
    views: 8750,
    url: "https://example.com/article-3",
  },
  {
    id: "4",
    title: "NASA's Mars Mission Discovers Evidence of Ancient Water Systems",
    summary: "Perseverance rover findings suggest Mars had extensive river networks billions of years ago, raising questions about past life.",
    source: "The Guardian",
    author: "Dr. Elena Rodriguez",
    publishedAt: "8 hours ago",
    category: "Science",
    imageUrl: "/api/placeholder/400/200",
    sentiment: "positive" as const,
    isBreaking: false,
    isTrending: true,
    readTime: 6,
    views: 19200,
    likes: 1540,
    comments: 287,
    url: "https://example.com/article-4",
  },
  {
    id: "5",
    title: "Championship Final Set as Rivals Advance in Dramatic Semifinals",
    summary: "Two powerhouse teams secure their spots in the championship game after thrilling overtime victories.",
    source: "CNN Sports",
    publishedAt: "10 hours ago",
    category: "Sports",
    sentiment: "positive" as const,
    isBreaking: false,
    isTrending: false,
    readTime: 3,
    views: 12800,
    url: "https://example.com/article-5",
  },
];

const breakingNews = {
  id: "breaking-1",
  title: "Major Earthquake Strikes Pacific Region, Tsunami Warning Issued",
  summary: "A 7.8 magnitude earthquake has struck off the coast, prompting emergency evacuations in coastal areas.",
  timestamp: "15 minutes ago",
  source: "Emergency Alert System",
  url: "https://example.com/breaking-news",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showBreaking, setShowBreaking] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    sources: [],
    timeRange: "",
    sentiment: [],
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const featuredArticle = mockArticles[0];
  const regularArticles = mockArticles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      {/* Breaking News Alert */}
      {showBreaking && (
        <div className="container mt-4">
          <BreakingNewsAlert
            news={breakingNews}
            onDismiss={() => setShowBreaking(false)}
          />
        </div>
      )}

      {/* Trending Bar */}
      <TrendingBar />

      {/* Filter Bar */}
      <FilterBar activeFilters={filters} onFiltersChange={setFilters} />

      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Latest News</h1>
            <p className="text-muted-foreground">
              Stay informed with AI-curated news from trusted sources
            </p>
          </div>
          
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted/30">
            <TabsTrigger value="all" className="gap-2">
              <Eye className="w-4 h-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="trending" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2">
              <Clock className="w-4 h-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="featured" className="gap-2">
              <Star className="w-4 h-4" />
              Featured
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Featured Article */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  Featured Story
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Editor's Pick
                </span>
              </div>
              <ArticleCard
                article={featuredArticle}
                variant="featured"
              />
            </div>

            {/* Regular Articles Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {regularArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="default"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {mockArticles
                .filter(article => article.isTrending)
                .map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="default"
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="grid gap-4">
              {mockArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="headline"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {mockArticles
                .filter(article => article.likes && article.likes > 1000)
                .map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="featured"
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" className="gap-2">
            Load More Articles
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}