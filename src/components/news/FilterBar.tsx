import { Filter, Calendar, Tag, Globe, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface FilterBarProps {
  activeFilters: {
    categories: string[];
    sources: string[];
    timeRange: string;
    sentiment: string[];
  };
  onFiltersChange: (filters: any) => void;
}

const categories = [
  "Politics", "Technology", "Business", "Sports", "World", "Science", "Health", "Entertainment"
];

const sources = [
  "Reuters", "BBC News", "Associated Press", "The Guardian", "CNN", "Al Jazeera"
];

const timeRanges = [
  { label: "Last Hour", value: "1h" },
  { label: "Last 6 Hours", value: "6h" },
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last Week", value: "7d" },
  { label: "Last Month", value: "30d" },
];

const sentiments = [
  { label: "Positive", value: "positive", color: "text-positive" },
  { label: "Neutral", value: "neutral", color: "text-neutral" },
  { label: "Negative", value: "negative", color: "text-negative" },
];

export function FilterBar({ activeFilters, onFiltersChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = Object.values(activeFilters).some(filter => 
    Array.isArray(filter) ? filter.length > 0 : filter !== ""
  );

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      sources: [],
      timeRange: "",
      sentiment: [],
    });
  };

  const removeFilter = (type: string, value: string) => {
    if (type === "timeRange") {
      onFiltersChange({ ...activeFilters, timeRange: "" });
    } else {
      const currentFilters = activeFilters[type as keyof typeof activeFilters] as string[];
      const newFilters = currentFilters.filter(f => f !== value);
      onFiltersChange({ ...activeFilters, [type]: newFilters });
    }
  };

  return (
    <div className="bg-card border-b">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Categories Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Tag className="w-4 h-4" />
                    Categories
                    {activeFilters.categories.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFilters.categories.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover/95 backdrop-blur">
                  <DropdownMenuLabel>Select Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={activeFilters.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        const newCategories = checked
                          ? [...activeFilters.categories, category]
                          : activeFilters.categories.filter(c => c !== category);
                        onFiltersChange({ ...activeFilters, categories: newCategories });
                      }}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sources Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="w-4 h-4" />
                    Sources
                    {activeFilters.sources.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFilters.sources.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover/95 backdrop-blur">
                  <DropdownMenuLabel>Select Sources</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {sources.map((source) => (
                    <DropdownMenuCheckboxItem
                      key={source}
                      checked={activeFilters.sources.includes(source)}
                      onCheckedChange={(checked) => {
                        const newSources = checked
                          ? [...activeFilters.sources, source]
                          : activeFilters.sources.filter(s => s !== source);
                        onFiltersChange({ ...activeFilters, sources: newSources });
                      }}
                    >
                      {source}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Time Range Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    {activeFilters.timeRange ? 
                      timeRanges.find(t => t.value === activeFilters.timeRange)?.label : 
                      "Time Range"
                    }
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur">
                  <DropdownMenuLabel>Select Time Range</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {timeRanges.map((range) => (
                    <DropdownMenuItem
                      key={range.value}
                      onClick={() => onFiltersChange({ ...activeFilters, timeRange: range.value })}
                    >
                      {range.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sentiment Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Sentiment
                    {activeFilters.sentiment.length > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFilters.sentiment.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover/95 backdrop-blur">
                  <DropdownMenuLabel>Select Sentiment</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {sentiments.map((sentiment) => (
                    <DropdownMenuCheckboxItem
                      key={sentiment.value}
                      checked={activeFilters.sentiment.includes(sentiment.value)}
                      onCheckedChange={(checked) => {
                        const newSentiments = checked
                          ? [...activeFilters.sentiment, sentiment.value]
                          : activeFilters.sentiment.filter(s => s !== sentiment.value);
                        onFiltersChange({ ...activeFilters, sentiment: newSentiments });
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-current ${sentiment.color}`}></div>
                        {sentiment.label}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              Clear All
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <>
            <Separator className="my-3" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Active filters:</span>
              
              {activeFilters.categories.map((category) => (
                <Badge
                  key={`category-${category}`}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeFilter("categories", category)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              ))}
              
              {activeFilters.sources.map((source) => (
                <Badge
                  key={`source-${source}`}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  {source}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeFilter("sources", source)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              ))}
              
              {activeFilters.timeRange && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  {timeRanges.find(t => t.value === activeFilters.timeRange)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeFilter("timeRange", activeFilters.timeRange)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              )}
              
              {activeFilters.sentiment.map((sentiment) => (
                <Badge
                  key={`sentiment-${sentiment}`}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  {sentiment}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeFilter("sentiment", sentiment)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}