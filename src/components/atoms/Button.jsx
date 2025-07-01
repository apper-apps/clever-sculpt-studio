import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden font-display font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
  
  const variants = {
    primary: "btn-neon bg-gradient-to-r from-primary to-accent text-background hover:shadow-lg hover:shadow-primary/30",
    secondary: "btn-neon bg-surface/80 text-white border border-white/20 hover:border-primary/50 hover:bg-surface",
    ghost: "text-white/70 hover:text-white hover:bg-white/10",
    danger: "btn-neon bg-error/20 text-error border border-error/50 hover:bg-error/30",
    tool: "bg-surface/60 text-white/80 border border-white/10 hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-md hover:shadow-primary/20",
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl",
    icon: "p-2 rounded-lg",
  }
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`
  
  return (
    <motion.button
      className={buttonClasses}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <ApperIcon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <ApperIcon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
    </motion.button>
  )
}

export default Button