import { AppHeader } from '@/components/layout/AppHeader'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { PromptWorkspace } from '@/components/enhancement/PromptWorkspace'
import { motion } from 'framer-motion'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <div className="flex-1 flex">
        <AppSidebar />
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex-1 flex flex-col"
        >
          <PromptWorkspace />
        </motion.main>
      </div>
    </div>
  )
}