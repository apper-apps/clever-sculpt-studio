import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  className = '', 
  containerClassName = '',
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg
    text-white font-body text-sm
    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50
    transition-all duration-200
    ${error ? 'border-error focus:border-error focus:ring-error/50' : ''}
    ${className}
  `
  
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-white/80 font-body mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-error text-xs font-body mt-1">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input