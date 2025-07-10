import { AlertTriangle, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface BreakingNewsAlertProps {
  news: {
    id: string;
    title: string;
    summary: string;
    timestamp: string;
    source: string;
    url: string;
  };
  onDismiss?: () => void;
}

export function BreakingNewsAlert({ news, onDismiss }: BreakingNewsAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <Alert className="border-breaking bg-breaking/5 mb-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-breaking/10 via-transparent to-breaking/10 animate-pulse"></div>
      
      <div className="relative flex items-start gap-3">
        <div className="flex items-center gap-2 mt-1">
          <AlertTriangle className="h-5 w-5 text-breaking animate-pulse" />
          <Badge variant="destructive" className="animate-pulse font-bold">
            BREAKING
          </Badge>
        </div>
        
        <div className="flex-1 min-w-0">
          <AlertDescription className="text-base">
            <div className="font-bold text-foreground mb-1">
              {news.title}
            </div>
            <p className="text-muted-foreground mb-2">
              {news.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium">{news.source}</span>
                <span>•</span>
                <span>{news.timestamp}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-breaking text-breaking hover:bg-breaking hover:text-white"
              >
                Read More
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </AlertDescription>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
}