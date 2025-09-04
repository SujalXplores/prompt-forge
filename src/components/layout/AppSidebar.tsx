import { motion } from 'framer-motion'
import { 
  RiMagicFill, 
  RiClipboardLine, 
  RiHistoryLine, 
  RiSettingsLine,
  RiBookmarkLine,
  RiLightbulbFill,
  RiBrainLine,
  RiNodeTree
} from '@remixicon/react'
import { GlassCard } from '@/components/ui/glass-card'

const enhancementTechniques = [
  { name: "Chain of Thought", icon: RiBrainLine, description: "Step-by-step reasoning" },
  { name: "Few-Shot", icon: RiLightbulbFill, description: "Learning from examples" },
  { name: "Zero-Shot", icon: RiMagicFill, description: "Direct instruction" },
  { name: "Tree of Thought", icon: RiNodeTree, description: "Branching logic" },
]

const sidebarItems = [
  { name: "Templates", icon: RiBookmarkLine, count: 12 },
  { name: "History", icon: RiHistoryLine, count: 48 },
  { name: "Clipboard", icon: RiClipboardLine, count: 3 },
  { name: "Settings", icon: RiSettingsLine },
]

export function AppSidebar() {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-80 h-full bg-background border-r border-border p-6 space-y-6 custom-scrollbar overflow-y-auto"
    >
      {/* Enhancement Techniques */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Enhancement Techniques</h3>
        <div className="space-y-2">
          {enhancementTechniques.map((technique, index) => (
            <motion.div
              key={technique.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <GlassCard 
                variant="glass" 
                size="sm" 
                className="p-4 cursor-pointer hover:border-primary group transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <technique.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {technique.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {technique.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <div className="space-y-2">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-all duration-300 group"
            >
              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="flex-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {item.name}
              </span>
              {item.count && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {item.count}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <GlassCard variant="gradient" size="default">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Usage This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Prompts Enhanced</span>
                <span className="font-semibold text-primary">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tokens Used</span>
                <span className="font-semibold text-secondary">45.2K</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: "68%" }} />
              </div>
              <p className="text-xs text-muted-foreground">68% of monthly limit used</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.aside>
  )
}