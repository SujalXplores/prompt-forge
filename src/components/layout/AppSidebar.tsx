import {
  RiMagicFill,
  RiClipboardLine,
  RiHistoryLine,
  RiSettingsLine,
  RiBookmarkLine,
  RiLightbulbFill,
  RiBrainLine,
  RiNodeTree,
} from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const enhancementTechniques = [
  {
    name: 'Chain of Thought',
    icon: RiBrainLine,
    description: 'Step-by-step reasoning',
  },
  {
    name: 'Few-Shot',
    icon: RiLightbulbFill,
    description: 'Learning from examples',
  },
  { name: 'Zero-Shot', icon: RiMagicFill, description: 'Direct instruction' },
  { name: 'Tree of Thought', icon: RiNodeTree, description: 'Branching logic' },
];

const sidebarItems = [
  { name: 'Templates', icon: RiBookmarkLine, count: 12 },
  { name: 'History', icon: RiHistoryLine, count: 48 },
  { name: 'Settings', icon: RiSettingsLine },
];

export function AppSidebar() {
  return (
    <aside className="w-80 h-full bg-background border-r p-6 space-y-6 overflow-y-auto">
      {/* Enhancement Techniques */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Enhancement Techniques</h3>
        <div className="space-y-2">
          {enhancementTechniques.map((technique) => (
            <Card
              key={technique.name}
              className="cursor-pointer hover:bg-accent"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                    <technique.icon className="w-4 h-4" />
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
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1 text-sm font-medium">{item.name}</span>
              {item.count && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Prompts Enhanced
            </span>
            <span className="font-semibold">127</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tokens Used</span>
            <span className="font-semibold">45.2K</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: '68%' }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            68% of monthly limit used
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
