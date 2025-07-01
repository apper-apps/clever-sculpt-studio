import { motion } from 'framer-motion'

const Loading = ({ variant = 'default' }) => {
  if (variant === 'viewport') {
    return (
      <div className="w-full h-full bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-white/70 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initializing 3D Environment...
          </motion.p>
        </div>
      </div>
    )
  }

  if (variant === 'panel') {
    return (
      <div className="glass-panel rounded-lg p-6 space-y-4">
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded animate-pulse" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded animate-pulse" />
          <div className="h-3 bg-white/10 rounded animate-pulse w-2/3" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      <motion.div
        className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export default Loading