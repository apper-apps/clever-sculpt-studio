import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  variant = 'default' 
}) => {
  if (variant === 'viewport') {
    return (
      <div className="w-full h-full bg-background flex items-center justify-center">
        <motion.div
          className="text-center p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="AlertTriangle" size={40} className="text-error" />
          </div>
          <h3 className="text-xl font-display font-semibold text-white mb-3">
            3D Environment Error
          </h3>
          <p className="text-white/70 font-body mb-6 max-w-md">
            {message}. This could be due to WebGL compatibility issues or graphics driver problems.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-neon px-6 py-3 bg-error/20 text-error font-medium rounded-lg hover:bg-error/30 transition-all duration-200"
            >
              <ApperIcon name="RefreshCw" size={16} className="inline mr-2" />
              Retry Loading
            </button>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className="glass-panel rounded-lg p-6 border-error/30"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <ApperIcon name="AlertCircle" size={16} className="text-error" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-medium text-error mb-1">Error</h4>
          <p className="text-white/70 font-body text-sm mb-3">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-error hover:text-error/80 font-body text-sm font-medium transition-colors duration-200"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Error