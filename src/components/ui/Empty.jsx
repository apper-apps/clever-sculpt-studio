import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No items found",
  description = "Get started by creating something new",
  actionLabel = "Create New",
  onAction,
  icon = "Package",
  variant = 'default'
}) => {
  if (variant === 'scene') {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center p-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Cube" size={48} className="text-primary" />
          </div>
          <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
            Welcome to Sculpt Studio
          </h3>
          <p className="text-white/60 font-body mb-8">
            Start creating by adding your first 3D object to the scene. Use the tools on the left to begin sculpting your vision.
          </p>
          <div className="pointer-events-auto">
            <button
              onClick={onAction}
              className="btn-neon px-8 py-4 bg-gradient-to-r from-primary to-accent text-background font-display font-semibold rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
            >
              <ApperIcon name="Plus" size={20} className="mr-2" />
              Add First Object
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="text-center py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name={icon} size={32} className="text-primary" />
      </div>
      <h3 className="text-lg font-display font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 font-body mb-6 max-w-sm mx-auto">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="btn-neon px-6 py-3 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-all duration-200"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionLabel}
        </button>
      )}
    </motion.div>
  )
}

export default Empty