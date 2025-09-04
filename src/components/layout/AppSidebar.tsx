import {
  RiMagicFill,
  RiClipboardLine,
  RiHistoryLine,
  RiSettingsLine,
  RiBookmarkLine,
  RiLightbulbFill,
  RiBrainLine,
  RiNodeTree,
  RiUserLine,
  RiRecycleLine,
  RiCheckDoubleLine,
  RiCodeBoxLine,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ENHANCEMENT_TECHNIQUES } from '@/lib/ai-config';
import { useUsageStats } from '@/hooks/use-ai-enhancement';
import { useEffect } from 'react';

const iconMap = {
  RiBrainLine,
  RiLightbulbFill,
  RiMagicFill,
  RiUserLine,
  RiRecycleLine,
  RiNodeTree,
  RiCheckDoubleLine,
  RiCodeBoxLine,
};

const sidebarItems = [
  { name: 'Templates', icon: RiBookmarkLine, count: 12 },
  { name: 'History', icon: RiHistoryLine, count: 48 },
  { name: 'Settings', icon: RiSettingsLine },
];

export function AppSidebar() {
  const { stats, loadStats } = useUsageStats();

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <aside
      className="w-80 h-full bg-background border-r p-6 space-y-6 overflow-y-auto"
    >
      {/* Enhancement Techniques */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Enhancement Techniques</h3>
          <Badge variant="secondary">{ENHANCEMENT_TECHNIQUES.length}</Badge>
        </div>
        <div className="space-y-2">
          {ENHANCEMENT_TECHNIQUES.map((technique, index) => {
            const IconComponent =
              iconMap[technique.icon as keyof typeof iconMap] || RiMagicFill;

            return (
              <div key={technique.id}>
                <Card className="cursor-pointer hover:bg-accent transition-colors group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                        <IconComponent className="w-4 h-4 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{technique.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {technique.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors group"
            >
              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="flex-1 text-sm font-medium">{item.name}</span>
              {item.count && (
                <Badge variant="secondary" className="text-xs">
                  {item.count}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div>
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Usage This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Prompts Enhanced
                </span>
                <span className="font-semibold">
                  {stats.promptsEnhanced || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Tokens Used
                </span>
                <span className="font-semibold">
                  {(stats.tokensUsed || 0).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={stats.usagePercentage || 0} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(stats.usagePercentage || 0)}% of monthly limit used
              </p>
            </div>

            <div className="pt-2 border-t border-primary/20">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Plan: Free</span>
                <Badge variant="outline" className="text-xs">
                  Upgrade
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <RiLightbulbFill className="w-4 h-4" />
              Pro Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Try combining different techniques for complex prompts. Start with
              Chain of Thought for reasoning, then apply Role-Based for
              expertise.
            </p>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
